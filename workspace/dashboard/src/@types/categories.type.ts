export interface ICategory {
  category_name: string;
  category_slug?: string;
  store_id?: string | null;
  id?:string;
}

export interface CategoriesContextType {
  categories: ICategory[];
  addCategory: (category: ICategory) => void;
  fetchCategories: (store_id: any) => void;
  deleteCategory: (id: string, store_id:string) => void;
  updateCategory: (category: ICategory) => void;
//   fetchCategoryById: (category_id: number) => void;
//   selectedCategory: ICategory;
//   updateCategory: (category: ICategory) => void;
}

export interface CategoriesMap {
  [id: number]: ICategory;
}
