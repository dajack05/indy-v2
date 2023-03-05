import { User } from ".prisma/client";
import { Context, createMockContext, MockContext } from "../../src/Context";
import { UserStore } from "../../src/stores/UserStore";

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});

test("Should create User", async () => {
  const user: User = {
    id: 1,
    name: "Test McTesterson",
    email: "test@test.com",
    password: "abcdefg",
    type: 0,
  };
  mockCtx.prisma.user.create.mockResolvedValue(user);

  await expect(
    UserStore.Create(ctx, { email: "test@test.com", password: "abcdefg", name: "Test McTesterson" })
  ).resolves.toEqual({
    id: 1,
    email: "test@test.com",
    name: "Test McTesterson",
    type: 0,
  });
});

test("Should update User", async () => {
  mockCtx.prisma.user.update.mockResolvedValue({
    id: 1,
    name: "New Name",
    email: "new@test.com",
    type: 1,
    password: "aabbccdd",
  });

  await expect(
    UserStore.Update(ctx, {
      id: 1,
      name: "New Name",
      email: "new@test.com",
      password: "aabbccdd",
      type: 1,
    })
  ).resolves.toEqual({
    id: 1,
    name: "New Name",
    email: "new@test.com",
    type: 1,
  });
});

test("Correct ID should return User", async () => {
  mockCtx.prisma.user.findUnique.mockResolvedValue({
    id: 1,
    name: "Test McTestface",
    email: "test@test.com",
    password: "abcdefg",
    type: 0,
  });

  await expect(UserStore.GetByID(ctx, 1)).resolves.toEqual({
    id: 1,
    name: "Test McTestface",
    email: "test@test.com",
    type: 0,
  });
});

test("Incorrect ID should return null", async () => {
  mockCtx.prisma.user.findUnique.mockResolvedValue(null);
  await expect(UserStore.GetByID(ctx, 2)).resolves.toEqual(null);
});

test("Correct Email should return User", async () => {
  mockCtx.prisma.user.findUnique.mockResolvedValue({
    id: 1,
    name: "Test McTestface",
    email: "test@test.com",
    password: "abcdefg",
    type: 0,
  });

  await expect(UserStore.GetByEmail(ctx, "test@test.com")).resolves.toEqual({
    id: 1,
    name: "Test McTestface",
    email: "test@test.com",
    type: 0,
  });
});

test("Incorrect ID should return null", async () => {
  mockCtx.prisma.user.findUnique.mockResolvedValue(null);
  await expect(UserStore.GetByEmail(ctx, "abcd")).resolves.toEqual(null);
});