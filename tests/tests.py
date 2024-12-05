from assertions import Scenario


def runTests():
    testMutableTypeLiteral()

    testReadonlyReference()

    testReadonlyTypeLiteral()

    testMultiLevelReadonlyTypeLiteral()

    testIntersection()

    testUnion()


def testMutableTypeLiteral():
    Scenario(
        "MutableBear", "mutable type literal"
    ).assert_no_readonly_wrappers().assert_mutable_property(
        "name"
    ).assert_mutable_property(
        "years"
    ).end()


def testReadonlyReference():
    Scenario("Bear", "readonly reference").assert_has_readonly_wrappers().end()


def testReadonlyTypeLiteral():
    Scenario(
        "Dodo", "readonly type literal"
    ).assert_no_readonly_wrappers().assert_readonly_property(
        "name"
    ).assert_readonly_property(
        "years"
    ).end()


def testMultiLevelReadonlyTypeLiteral():
    Scenario(
        "Chipmunk", "multi-level readonly type literal"
    ).assert_no_readonly_wrappers().assert_readonly_property(
        "name"
    ).assert_readonly_property(
        "years"
    ).end()


def testIntersection():
    Scenario(
        "PolarBear", "intersection"
    ).assert_no_readonly_wrappers().assert_readonly_property(
        "coordinates"
    ).assert_readonly_property(
        "bestFriend"
    ).end()


def testUnion():
    Scenario(
        "YellowstoneAnimal", "union"
    ).assert_no_readonly_wrappers().assert_readonly_property("genericName").end()


runTests()
