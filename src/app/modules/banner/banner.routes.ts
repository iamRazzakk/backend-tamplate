import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";
import { BannerController } from "./banner.controller";
import {
  getSingleFilePath,
  getUploadFields,
} from "../../middlewares/fileUploaderHandelar";
import ApiError from "../../../errors/ApiErrors";
import { StatusCodes } from "http-status-codes";
import { responseMessage } from "../../constant/response.message";
const router = express.Router();

router
  .route("/")
  .post(
    // auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
    getUploadFields(),
    async (req: Request, _res: Response, next: NextFunction) => {
      try {
        const data = req.body;
        const imagePath = getSingleFilePath(
          req.files as Record<string, Express.Multer.File[]>,
          "image"
        );
        if (!imagePath) {
          throw new ApiError(
            StatusCodes.BAD_REQUEST,
            `Image ${responseMessage.NAME_REQUIRED}`
          );
        }
        if (imagePath) {
          data.image = imagePath;
        }
        req.body = data;
        next();
      } catch (error) {
        next(error);
      }
    },
    BannerController.createBanner
  )
  .get(
    auth(USER_ROLES.USER, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
    BannerController.getAllBanner
  );

router
  .route("/:id")
  .patch(
    auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
    getUploadFields(),
    BannerController.updateBanner
  )
  .delete(
    auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
    BannerController.deleteBanner
  );

export const BannerRoutes = router;
