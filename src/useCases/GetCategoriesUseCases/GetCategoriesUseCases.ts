import { CategoryService } from "../../services/CategoryService/CategoryService";
import {
  loadCategory,
  loadCategoryDone,
  loadCategoryFail,
} from "../../stores/CategoryStore/CategoryEvents";
import { RequestError } from "../../domain/request";
import { CategoryValues } from "../../domain/category";

const execute = async (): Promise<void> => {

  loadCategory();

  return CategoryService.getCategories()
    .then((categories: CategoryValues[]) => {
      loadCategoryDone(categories.reverse());
    })
    .catch(({ hasError, message }: RequestError) => { loadCategoryFail({ hasError, message });
      });
};

const GetCategoriesUseCase = {
  execute,
};

export default GetCategoriesUseCase;