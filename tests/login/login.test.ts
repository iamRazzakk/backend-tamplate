import request from "supertest";
import app from "../../src/app";

const userInformation = {
    email: "mdabdurrazzakrakib290@gmail.com",
    password: "StrongPass123",
};

describe("Login Test", () => {
    it("should login successfully", async () => {
        const res = await request(app)
            .post("/api/v1/auth/login")
            .send(userInformation);
        expect(res.body.success).toBe(true);
        expect(res.status).toBe(200);
        expect(res.body.message).toContain("User login successfully");
    })
});