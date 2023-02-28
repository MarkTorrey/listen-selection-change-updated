/**
  Licensing

  Copyright 2022 Esri

  Licensed under the Apache License, Version 2.0 (the "License"); You
  may not use this file except in compliance with the License. You may
  obtain a copy of the License at
  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
  implied. See the License for the specific language governing
  permissions and limitations under the License.

  A copy of the license is available in the repository's
  LICENSE file.
*/
import { React, Immutable, UseDataSource, JimuFieldType, IMFieldSchema, DataSource, ImmutableArray, ImmutableObject } from 'jimu-core'
import { AllWidgetSettingProps } from 'jimu-for-builder'
import { IMConfig } from '../config'
import { DataSourceSelector, AllDataSourceTypes, FieldSelector } from 'jimu-ui/advanced/data-source-selector'
import { SettingRow, SettingSection } from 'jimu-ui/advanced/setting-components'

export default function Setting (props: AllWidgetSettingProps<IMConfig>) {

  const { useState} = React

  const [selField, setSelField] = useState<string>(props.config.LabelField)

  const onToggleUseDataEnabled = (useDataSourcesEnabled: boolean) => {
    props.onSettingChange({
      id: props.id,
      useDataSourcesEnabled
    })
  }

  const onDataSourceChange = (useDataSources: UseDataSource[]) => {
    props.onSettingChange({
      id: props.id,
      useDataSources: useDataSources
    })
  }

  const labelFieldDidChange = (allSelectedFields: IMFieldSchema[], ds: DataSource)=>{
    props.onSettingChange({
      id: props.id,
      config: props.config.set("LabelField", allSelectedFields[0].name)
    });

    const fldName = allSelectedFields[0].name
    setSelField(fldName)
  }

  return <div className='widget-setting-listen-selection-change p-2'>

    <DataSourceSelector
      types={Immutable([AllDataSourceTypes.FeatureLayer])}
      useDataSources={props.useDataSources}
      useDataSourcesEnabled={props.useDataSourcesEnabled}
      onToggleUseDataEnabled={onToggleUseDataEnabled}
      onChange={onDataSourceChange}
      widgetId={props.id}
    />

    {props.useDataSourcesEnabled &&
      <SettingSection title={'Label field'} >
          <SettingRow>
            <FieldSelector
              useDataSources={props.useDataSources}
              types={Immutable([JimuFieldType.String])}
              isMultiple={false}
              useDropdown
              onChange={labelFieldDidChange}
              selectedFields={Immutable([selField])}
              widgetId={props.id}
              isSearchInputHidden={true}
              isDataSourceDropDownHidden = {true}>
            </FieldSelector>
          </SettingRow>
      </SettingSection>
    }
  </div>
}
