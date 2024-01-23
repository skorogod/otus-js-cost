import React, {
  FC,
} from "react";
import ReactDOM from "react";
import { Category, SubCategory } from "../../store/types";


interface CategoryElProps extends Omit<Category, "dates"> {
  onCategoryChecked?: Function;
  onSubcategoryChecked?: Function;
  visible: boolean;
}


const getSubCategorySelect = (
  categoryId: string,
  subCategories: SubCategory[],
  onOptionChecked?: Function
) => {
  return subCategories ? (
    <select onChange={() => {
        if(onOptionChecked){
            const el = document.getElementById(`sub-${categoryId}`) as HTMLInputElement
            onOptionChecked(el.value)
        }
            
    }} name="subCategory" id={`sub-${categoryId}`}>
      <option value="">--choose subcategory--</option>
      {subCategories.map((sub: SubCategory) => {
        return (
          <option  key={sub.id} value={sub.id}>
            {sub.name}
          </option>
        );
      })}
    </select>
  ) : null;
};


export const CategoryComponent: FC<CategoryElProps> = (props: CategoryElProps) => {
  return (
    <div className="category">
      <input
        type="radio"
        name="category"
        value={props.id}
        onChange={() => {
          if (props.onCategoryChecked) {
            props.onCategoryChecked(props.id);
          }
        }}
      />
      <label htmlFor={`${props.id}`}>{props.name}</label>
      {props.visible && getSubCategorySelect(props.id, Object.values(props.subCategories), props.onSubcategoryChecked)}
    </div>
  );
};
