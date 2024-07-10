import React from 'react';

import { GenericCrud} from '@/modules/store/containers/GenericCrud';

const App: React.FC = () => {
  return <>
    <GenericCrud 
      endpoint='/store/categories/'
      fields={[
        // {
        //   name: 'id',
        //   label: 'ID',
        //   type: 'string',
        //   rules: [],
        // },
        {
          name: 'name',
          label: 'Name',
          type: 'string',
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
