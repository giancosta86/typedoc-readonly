from typing import Self
from subprocess import Popen, PIPE
from sys import stderr, exit
from pathlib import Path

json_docs = Path("website/docs.json").read_text()


def ok(message: str):
    print(f"✅{message}")


def fail(message: str):
    print(f"❌{message}", file=stderr)
    exit(1)


def select_via_jq(source_json: str, jq_operation: str) -> str:
    with Popen(["echo", source_json], stdout=PIPE, text=True) as echo:
        with Popen(
            ["jq", "-r", jq_operation], stdin=echo.stdout, stdout=PIPE, text=True
        ) as jq:
            return jq.communicate()[0].strip()


class Scenario:
    _type: str
    _description: str
    _type_json: str

    def __init__(self, type: str, description: str):
        self._type = type
        self._description = description

        print(f"🔎Testing type '{type}' ({description})...")

        self._type_json = select_via_jq(
            json_docs, f'.children[] | select(.name == "{type}")'
        )

        if not self._type_json:
            fail(f"Type {type} has no documentation!")

    def _has_readonly_wrappers(self) -> bool:
        readonly_wrappers = select_via_jq(
            self._type_json,
            '.. | objects | select(.name == "Readonly" and .package == "typescript")',
        )

        return readonly_wrappers != ""

    def assert_has_readonly_wrappers(self) -> Self:
        if self._has_readonly_wrappers():
            ok(f"{self._type} includes Readonly<>!")
        else:
            fail(f"{self._type} does NOT include Readonly<>!")

        return self

    def assert_no_readonly_wrappers(self) -> Self:
        if self._has_readonly_wrappers():
            fail(f"{self._type} includes Readonly<>!")
        else:
            ok(f"{self._type} does NOT include Readonly<>!")

        return self

    def _getPropertyJson(self, property_name: str) -> str:
        property_code = 1024

        property_json = select_via_jq(
            self._type_json,
            f'.. | objects | select(.kind == {property_code} and .name == "{property_name}")',
        )

        if property_json == "":
            fail(f"Type '{self._type}' has no property '{property_name}'")

        return property_json

    def _is_property_readonly(self, property_name: str) -> bool:
        property_json = self._getPropertyJson(property_name)

        readonly_status = select_via_jq(property_json, ".flags.isReadonly")

        return readonly_status == "true"

    def assert_readonly_property(self, property_name: str) -> Self:
        if self._is_property_readonly(property_name):
            ok(f"Property '{property_name}' is readonly!")
        else:
            fail(f"Property '{property_name}' is NOT readonly!")

        return self

    def assert_mutable_property(self, property_name: str) -> Self:
        if self._is_property_readonly(property_name):
            fail(f"Property '{property_name}' is readonly!")
        else:
            ok(f"Property '{property_name}' is NOT readonly!")

        return self

    def end(self) -> None:
        ok(f"All tests for {self._description} are OK!")
