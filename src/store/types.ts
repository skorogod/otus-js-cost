import type { BaseState } from ".";

export interface SettingsState extends BaseState  {
}

export type Category = {
    id: string,
    name: string,
    dates: {[key: string]: {count: Number}}
    subCategories: {[key: string]: SubCategory};
}

export type Categories = {[key: string]: Category}

export type SubCategory = Omit<Category, "subCategories">


export interface DashboardState  extends BaseState 
{   
    checkedCategory: Category['id'];
    checkedSubcategory: SubCategory['id'];
}