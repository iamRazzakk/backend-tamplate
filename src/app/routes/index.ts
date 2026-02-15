import express from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { ProductsRoutes } from "../modules/products/products.routes";
import { BannerRoutes } from "../modules/banner/banner.routes";
const router = express.Router();

const apiRoutes = [
  { path: "/user", route: UserRoutes },
  { path: "/auth", route: AuthRoutes },
  { path: "/auth", route: AuthRoutes },
  { path: "/products", route: ProductsRoutes },
  { path: "/banner", route: BannerRoutes },
];

apiRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
