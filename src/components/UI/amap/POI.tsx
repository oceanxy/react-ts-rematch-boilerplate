/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 高德地图POI搜索组件
 * @Date: 2020-04-01 周三 09:04:01
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-01 周三 09:04:01
 */

import Icon, { IconSource, IconSourceHover } from '@/components/UI/icon';
import { IPOI, monitorTypeIcon, SearchCondition } from '@/models/UI/search';
import _ from 'lodash';
import React, { useEffect } from 'react';
import Autocomplete = AMap.Autocomplete;

export interface IPOIProp {
  map?: AMap.Map;
  searchCondition?: SearchCondition;
  data?: IPOI[];
  updatePOIData?: (data: IPOI[]) => void;
  keyword?: string;
}

const POI = (props: IPOIProp) => {
  const { map, searchCondition, data, updatePOIData, keyword } = props;

  useEffect(() => {
    AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], () => {
      if (map && searchCondition === SearchCondition.POSITION) {
        // const autocomplete = new AMap.Autocomplete({
        //   input: 'searchBox'
        // });
        const autocomplete = new AMap.Autocomplete({});
        const placeSearch = new AMap.PlaceSearch({
          map
        });

        autocomplete.search(
          keyword ?? '',
          (status: Autocomplete.SearchStatus, result: Autocomplete.SearchResult | string) => {
            if (status === 'complete' && _.isPlainObject(result)) {
              const { info, tips } = result as Autocomplete.SearchResult;

              if (info === 'OK' && _.isArray(tips)) {
                console.log(tips);
                updatePOIData!(tips);
              }
            }
          }
        );

        // AMap.event.addListener(autocomplete, 'select', (e) => {
        //   // TODO 针对选中的poi实现自己的功能
        //   placeSearch.setCity(e.poi.adcode);
        //   placeSearch.search(e.poi.name, () => {
        //   });
        // });
      }
    });
  }, [keyword]);

  return (
    <>
      {data?.map((position: IPOI, index: number) => (
        <li className="inter-plat-search-display-item" key={`position-item-${index}`}>
          <Icon
            text={position.name}
            icon={monitorTypeIcon['location'] as IconSource}
            iconHover={monitorTypeIcon['location_hover'] as IconSourceHover}
          />
        </li>
      )) ?? null}
    </>
  );
};

export default POI;
