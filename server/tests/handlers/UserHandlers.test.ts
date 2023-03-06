import { Request, Response, request } from "express";
import { UserHandlers } from "../../src/handlers/UserHandlers";
import { Context, MockContext, createMockContext } from "../../src/Context";
import { User, UserStore } from "../../src/stores/UserStore";

let mockCtx: MockContext;
let ctx: Context;

describe("UserHandlers Tests", () => {
  beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
  });

  afterEach(() => jest.clearAllMocks());

  test("Valid ID returns valid user", () => {
    const req = {
      params: { id: "1" },
    };

    const res = {
      text: "",
      send: function (input: string) {
        this.text = input;
      },
    };

    jest.spyOn(UserStore, "GetByID");
    jest.mock("../../src/stores/UserStore",()=>{
        default:()=>{},
    });

    UserHandlers.GetUserByID(
      ctx,
      req as unknown as Request,
      res as unknown as Response
    );

    expect(UserStore.GetByID).toBeCalled();
  });

  // test("Missing ID returns empty", () => {
  //     const req = {
  //         params: {}
  //     };

  //     const res = {
  //         text: '',
  //         send: function (input: string) { this.text = input }
  //     };

  //     UserHandlers.GetUserByID(ctx, req as unknown as Request, res as unknown as Response);

  //     expect(res.text).toBe("");
  // })
});
