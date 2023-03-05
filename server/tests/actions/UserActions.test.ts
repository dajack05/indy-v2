import { User } from ".prisma/client";
import { Context, createMockContext, MockContext } from "../../src/Context";
import { UserActions } from "../../src/actions/UserActions";
import { CreateUserParams } from "../../src/stores/UserStore";

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
});

test("Should run UserStore.Create() once", async () => {
    const func = jest.mock("../../src/stores/UserStore", () => {
        return {
            default: jest.fn().mockImplementation(() => ({
                Create: jest.fn()
            }))
        }
    });
    await UserActions.Create(ctx, { email: "test@test.com", password: "12345", name: "Test McTesterson" });
    expect(func.);
});