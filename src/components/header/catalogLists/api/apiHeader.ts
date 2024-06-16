import { TypeModel } from '../../../../models/typeModel';
import mainApi from '../../../../store/mainApi';

const apiHeader = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getType: build.query<TypeModel[], void>({
            query: () => `type`
        }),
    }),
})

export const { 
    useGetTypeQuery,
} = apiHeader;