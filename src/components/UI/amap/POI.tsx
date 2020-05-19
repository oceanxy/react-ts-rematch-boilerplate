/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 高德地图POI搜索组件
 * @Date: 2020-04-01 周三 09:04:01
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-19 周二 17:44:04
 */

import Icon, { IconSource, IconSourceHover } from '@/components/UI/iconComp';
import { monitorTypeIcon, SearchCondition } from '@/models/UI/search';
import _ from 'lodash';
import React, { useEffect } from 'react';
import Autocomplete = AMap.Autocomplete;
import PlaceSearch = AMap.PlaceSearch;

/**
 * 位置搜索接口
 */
export interface IPositionProp {
  map: AMap.Map
  searchCondition: ISearchState['searchCondition']
  data: IPositionState['searchPositions']
  setState: IPositionModel['effects']['setState']
  setSearchState: ISearchModel['effects']['setState']
  keyword: ISearchState['searchKeyword']
}

let autocomplete: any;
let placeSearch: any;

/**
 * 位置搜索组件
 * @param {Partial<IPositionProp>} props
 * @returns {any}
 * @constructor
 */
const Position = (props: Partial<IPositionProp>) => {
  const {map, searchCondition, data, setState, keyword, setSearchState} = props;

  if (!autocomplete) {
    AMap.plugin(['AMap.Autocomplete'], () => {
      autocomplete = new AMap.Autocomplete({});
    });
  }

  if (!placeSearch) {
    AMap.plugin(['AMap.PlaceSearch'], () => {
      placeSearch = new AMap.PlaceSearch({map});
    });
  }

  /**
   * 处理POI搜索结果面板项点击事件
   * @param {IPosition} position
   */
  const handlePOIClick = (position: IPosition) => {
    placeSearch && placeSearch.search(position.name, (status: PlaceSearch.SearchStatus, result: string | PlaceSearch.SearchResult) => {
      if (status === 'complete' && _.isPlainObject(result)) {
        // 关闭搜索结果面板
        setSearchState!({isShowResultPanel: false});
      }
    });
  };

  useEffect(() => {
    if (map && searchCondition === SearchCondition.POSITION) {
      autocomplete && autocomplete.search(
        keyword ?? '',
        (status: Autocomplete.SearchStatus, result: Autocomplete.SearchResult | string) => {
          if (status === 'complete' && _.isPlainObject(result)) {
            const {info, tips} = result as Autocomplete.SearchResult;

            if (info === 'OK' && _.isArray(tips)) {
              setState!({searchPositions: tips});
            }
          }
        }
      );
    }
  }, [keyword]);

  return (
    <>
      {
        data?.map((position: IPosition, index: number) => (
          <li className="inter-plat-search-display-item" key={`position-item-${index}`}>
            <Icon
              text={position.name}
              icon={monitorTypeIcon['location'] as IconSource}
              iconHover={monitorTypeIcon['location_hover'] as IconSourceHover}
              onClick={handlePOIClick.bind(null, position)}
            />
          </li>
        )) ?? null
      }
    </>
  );
};

export default Position;
