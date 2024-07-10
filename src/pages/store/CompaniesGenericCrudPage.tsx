import React from 'react';

import { GenericCrud} from '@/modules/store/containers/GenericCrud';

const App: React.FC = () => {
  return <>
    <GenericCrud 
      endpoint='/store/companies/'
      fields={[
        // {
        //   name: 'id',
        //   label: 'ID',
        //   type: 'string',
        //   rules: [],
        // },
        {
          name: 'business_name',
          label: 'Business Name',
          type: 'string',
          rules: [],
        },
        {
          name: 'registration_name',
          label: 'Registration Name',
          type: 'string',
          rules: [],
        },
        {
          name: 'ruc',
          label: 'RUC',
          type: 'integer',
          rules: [],
        },
        // {
        //   name: 'active',
        //   label: 'Active',
        //   type: 'boolean',
        //   rules: [],
        // },
      ]}
    />
  </>
}

export default App;
