/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 搜索结果面板组件
 * @Date: 2020-03-30 周一 14:03:30
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-01 周三 15:04:01
 */

import Icon, { IconSource, IconSourceHover } from '@/components/UI/icon';
import { ISearch } from '@/components/UI/search/index';
import { POI } from '@/containers/UI/amap';
import { IFence, IMonitor, IPOI, ISearchState, monitorTypeIcon, SearchCondition } from '@/models/UI/search';
import React from 'react';
import styled, { StyledComponent } from 'styled-components';

export interface ISearchPanel {
  searchState: ISearchState;
  isShow: boolean;
}

/**
 * styledComponent组件属性
 */
interface ISearchProps {
  data: IMonitor[] | IFence[] | IPOI[];
  isShow: boolean;
}

/**
 * 用于展示搜索结果的下拉列表styled组件
 * @type {StyledComponent<"ul", AnyIfEmpty<DefaultTheme>, {} & {className: string}, keyof {className: string}>}
 */
export const StyledSearchPanel: StyledComponent<any, ISearch> = styled.ul.attrs((props: ISearchProps) => {
  return {
    className: `${
      props.data?.length ? (props.isShow ? 'inter-plat-search-display-show' : 'inter-plat-search-display-hide') : ''
    }`
  };
})``;

/**
 * 处理搜索结果面板数据
 * @param {SearchCondition} searchCondition
 * @param {ISearch["data"]} data
 */
function handleSearchPanelElement(searchCondition: SearchCondition, data?: ISearchState) {
  switch (searchCondition) {
    case SearchCondition.AREA:
      return (
        data?.fenceList.map((item: IFence, index: number) => (
          <li className="inter-plat-search-display-item have-children" key={`fence-item-${index}`}>
            <Icon text={item.name} icon={IconSource.AREA} iconHover={IconSourceHover.AREA} />
            {item.childNodes ? (
              <StyledSearchPanel data={item.childNodes} isShow={true} className="secondary">
                {item.childNodes.map((fence: IFence, fenIndex: number) => (
                  <li className="inter-plat-search-display-item" key={`fence-item-${index}-${fenIndex}`}>
                    <Icon
                      text={fence.name}
                      icon={monitorTypeIcon[fence.objType] as IconSource}
                      iconHover={monitorTypeIcon[`${fence.objType}_hover`] as IconSourceHover}
                    />
                  </li>
                ))}
              </StyledSearchPanel>
            ) : null}
          </li>
        )) ?? <div>暂无数据</div>
      );
    case SearchCondition.POSITION:
      return <POI />;
    case SearchCondition.ENTITY:
    default:
      return (
        data?.monitorList.map((item: IMonitor, index: number) => {
          return (
            <li className="inter-plat-search-display-item" key={`monitor-item-${index}`}>
              <Icon
                text={item.monitorName}
                icon={monitorTypeIcon[item.monitorType] as IconSource}
                iconHover={monitorTypeIcon[`${item.monitorType}_hover`] as IconSourceHover}
              />
            </li>
          );
        }) ?? <div>暂无数据</div>
      );
  }
}

/**
 * 根据搜索条件处理数据
 * @param {SearchCondition} searchCondition
 * @param {ISearchState} data
 * @returns {IMonitor[] | undefined | IFence[]}
 */
function handleData(searchCondition: SearchCondition, data?: ISearchState) {
  switch (searchCondition) {
    case SearchCondition.POSITION:
      return data?.fenceList;
    case SearchCondition.AREA:
      return data?.fenceList;
    case SearchCondition.ENTITY:
    default:
      return data?.monitorList;
  }
}

const SearchPanel = (props: ISearchPanel) => {
  const { isShow, searchState } = props;
  const { searchCondition, ...data } = searchState;

  return (
    <StyledSearchPanel data={handleData(searchCondition!, data)} isShow={isShow} className="inter-plat-search-display">
      {handleSearchPanelElement(searchCondition!, data)}
    </StyledSearchPanel>
  );
};

export default SearchPanel;
