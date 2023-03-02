/** @jsx jsx */
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
import {
  React,
  jsx,
  css,
  IMDataSourceInfo,
  DataSource,
  DataSourceStatus,
  FeatureLayerQueryParams,
  AllWidgetProps,
  DataSourceComponent,
  classNames,
} from 'jimu-core';
import { Button } from 'jimu-ui';
import { IMConfig } from '../config';

import defaultMessages from './translations/default';

/**
 * This widget shows how to listen to the selection change of a data source.
 */
export default function Widget(props: AllWidgetProps<IMConfig>) {
  const isDsConfigured = () => {
    if (props.useDataSources && props.useDataSources.length === 1) {
      return true;
    }
    return false;
  };

  const dataRender = (ds: DataSource, info: IMDataSourceInfo) => {
    return (
      <div className='record-list'>
        {ds && ds.getStatus() === DataSourceStatus.Loaded
          ? ds.getRecords().map((r, i) => {
              return (
                <Button
                  type='tertiary'
                  key={i}
                  onClick={() => ds.selectRecordById(r.getId())}
                  className={classNames({
                    'blue-border': ds
                      .getSelectedRecordIds()
                      ?.includes(r.getId()),
                  })}
                >
                  {r.getFieldValue(props.config.LabelField)}
                </Button>
              );
            })
          : null}
      </div>
    );
  };

  if (!isDsConfigured()) {
    return (
      <h3>
        {props.intl.formatMessage({
          id: 'widgetHeading',
          defaultMessage: defaultMessages.widgetHeading,
        })}
        <br />
        {props.intl.formatMessage({
          id: 'connectDS',
          defaultMessage: defaultMessages.connectDS,
        })}
      </h3>
    );
  }

  return (
    <div className='widget-listen-selection-change' css={style}>
      <h3>
        {props.intl.formatMessage({
          id: 'widgetHeading',
          defaultMessage: defaultMessages.widgetHeading,
        })}
      </h3>

      <DataSourceComponent
        useDataSource={props.useDataSources[0]}
        query={{ where: '1=1' } as FeatureLayerQueryParams}
        widgetId={props.id}
      >
        {dataRender}
      </DataSourceComponent>
    </div>
  );
}

const style = css`
  width: 100%;
  height: 100%;
  max-height: 800px;
  overflow: auto;
  .blue-border {
    border: 1px solid var(--primary-500);
    background-color: lightgray;
  }
  .record-list {
    width: 100%;
    margin-top: 20px;
    height: calc(100% - 80px);
    overflow: auto;
  }
`;
