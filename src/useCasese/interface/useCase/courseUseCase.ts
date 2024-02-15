import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICourseResponse } from "../response/courseResponse";

export interface ICourseUseCase {
  getCourseInProgress(req: Req, next: Next): Promise<ICourseResponse | void>;
  addModule(req: Req, next: Next): Promise<string | void>;
}