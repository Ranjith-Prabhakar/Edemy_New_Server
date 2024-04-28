import { ICategory } from "../../../entities/category";
import { ICategoryRepository } from "../../../useCasese/interface/repository/categoryRepository";
import { ICategoryResponse } from "../../../useCasese/interface/request_And_Response/category";

// import {
//   addCategory,
//   existCategory,
//   getCategories,
//   freezCategory,
//   unFreezCategory,
//   updateCategoryPurchasecount,
//   topSellingCategories_Statistics,
// } from "./categoryRepository/index";
import * as categoryRepositoryEngine from "./categoryRepository/index" 

export class CategoryRepository implements ICategoryRepository {
  // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async addCategory(category: string): Promise<ICategory> {
    try {
      return categoryRepositoryEngine.addCategory(category);
    } catch (error) {
      throw error;
    }
  }
  // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async existCategory(category: string): Promise<"exist" | "not exist"> {
    try {
      return categoryRepositoryEngine.existCategory(category);
    } catch (error) {
      throw error;
    }
  }
  // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888

  async getCategories(admin: boolean): Promise<void | ICategory[]> {
    try {
      return await categoryRepositoryEngine.getCategories(admin);
    } catch (error) {
      throw error;
    }
  }
  // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async freezCategory(id: string): Promise<ICategoryResponse | void> {
    try {
      return await categoryRepositoryEngine.freezCategory(id);
    } catch (error) {
      throw error;
    }
  }
  // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async unFreezCategory(id: string): Promise<ICategoryResponse | void> {
    try {
      return await categoryRepositoryEngine.unFreezCategory(id);
    } catch (error) {
      throw error;
    }
  }
  // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async updateCategoryPurchasecount(name: string): Promise<boolean | void> {
    try {
      return await categoryRepositoryEngine.updateCategoryPurchasecount(name);
    } catch (error) {
      throw error;
    }
  }
  // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async topSellingCategories_Statistics(): Promise<
    void | { name: string; noOfCourses: string }[]
  > {
    try {
      return await categoryRepositoryEngine.topSellingCategories_Statistics();
    } catch (error) {
      throw error;
    }
  }
}
