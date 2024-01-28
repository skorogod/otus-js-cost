import * as insertCategory from '../../firebase/methods/insertCategory'
import { Category } from '../store/types'
import { store } from '../store'
import { addCategory } from '../store/settingsReducer'
import { insertCategoryParams } from '../../firebase/methods/insertCategory'

describe("add category Action test", () => {
    test("add category action executes insert category", () => {
        const params: insertCategoryParams = {
            userId: "gjdkfnbdffjfkhgnf",
            categoryName: "Машина",
        }

        const spy = jest.spyOn(insertCategory, 'insertCategory')

        store.dispatch(addCategory(params)).then(() => {
            expect(spy).toHaveBeenCalledWith(params)
        })
    })
})