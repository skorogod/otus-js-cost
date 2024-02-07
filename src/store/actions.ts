const ADD_CATEGORY = "ADD_CATEGORY";

export type Actions = ReturnType<typeof addCategory>;

export const addCategory = (category: string) =>
  ({
    type: ADD_CATEGORY,
    payload: category,
  }) as const;
