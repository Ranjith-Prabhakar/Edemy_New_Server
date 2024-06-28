"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
// import {
//   addCategory,
//   existCategory,
//   getCategories,
//   freezCategory,
//   unFreezCategory,
//   updateCategoryPurchasecount,
//   topSellingCategories_Statistics,
// } from "./categoryRepository/index";
const categoryRepositoryEngine = __importStar(require("./categoryRepository/index"));
class CategoryRepository {
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async addCategory(category) {
        try {
            return categoryRepositoryEngine.addCategory(category);
        }
        catch (error) {
            throw error;
        }
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async existCategory(category) {
        try {
            return categoryRepositoryEngine.existCategory(category);
        }
        catch (error) {
            throw error;
        }
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async getCategories(admin) {
        try {
            return await categoryRepositoryEngine.getCategories(admin);
        }
        catch (error) {
            throw error;
        }
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async freezCategory(id) {
        try {
            return await categoryRepositoryEngine.freezCategory(id);
        }
        catch (error) {
            throw error;
        }
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async unFreezCategory(id) {
        try {
            return await categoryRepositoryEngine.unFreezCategory(id);
        }
        catch (error) {
            throw error;
        }
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async updateCategoryPurchasecount(name) {
        try {
            return await categoryRepositoryEngine.updateCategoryPurchasecount(name);
        }
        catch (error) {
            throw error;
        }
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async topSellingCategories_Statistics() {
        try {
            return await categoryRepositoryEngine.topSellingCategories_Statistics();
        }
        catch (error) {
            throw error;
        }
    }
}
exports.CategoryRepository = CategoryRepository;
//# sourceMappingURL=categoryRepository.js.map