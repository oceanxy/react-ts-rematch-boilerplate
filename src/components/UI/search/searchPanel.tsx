/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 搜索结果面板组件
 * @Date: 2020-03-30 周一 14:03:30
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-13 周一 15:05:37
 */

import Icon, { IconSource, IconSourceHover } from '@/components/UI/iconComp';
import { ISearchProps } from '@/components/UI/search/index';
import { POI } from '@/containers/UI/amap';
import { EntityType } from '@/models/UI/entity';
import { monitorTypeIcon, SearchCondition } from '@/models/UI/search';
import React, { useEffect, useRef } from 'react';
import styled, { StyledComponent } from 'styled-components';

/**
 * 搜索面板props接口
 */
export interface ISearchPanelProps {
  searchState: ISearchState & SearchResultData
  isShow: boolean
  setIsShowSearchResult: (isShow: boolean) => void
}

/**
 * styledComponent组件属性
 */
interface IStyledSearchProps {
  dataLength: number
  isShow: boolean
}

/**
 * 用于展示搜索结果的下拉列表styled组件
 * @type {StyledComponent<any, ISearchProps>}
 */
export const StyledSearchPanel: StyledComponent<any, ISearchProps> = styled.ul.attrs((props: IStyledSearchProps) => ({
  className: `${
    props.dataLength ? (props.isShow ? 'inter-plat-search-display-show' : 'inter-plat-search-display-hide') : ''
  }`
}))``;

/**
 * 处理搜索结果面板数据
 * @param {SearchCondition} searchCondition
 * @param {ISearch["data"]} data
 */
function handleSearchPanelElement(searchCondition: SearchCondition, data?: SearchResultData) {
  switch (searchCondition) {
    case SearchCondition.AREA:
      return (
        data?.searchFences.map((item: IFence, index: number) => (
          <li className="inter-plat-search-display-item have-children" key={`fence-item-${index}`}>
            <Icon text={item.name} icon={IconSource.AREA} iconHover={IconSourceHover.AREA} />
            {item.childNodes ? (
              <StyledSearchPanel dataLength={item.childNodes?.length} isShow={true} className="secondary">
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
        data?.searchEntities.map((item: IEntity, index: number) => {
          return (
            <li className="inter-plat-search-display-item" key={`monitor-item-${index}`}>
              <Icon
                text={item.monitorName}
                icon={monitorTypeIcon[item.monitorType! as EntityType] as IconSource}
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
 * @param {SearchResultData} data
 * @returns {number | undefined}
 */
function handleData(searchCondition: SearchCondition, data?: SearchResultData): number | undefined {
  switch (searchCondition) {
    case SearchCondition.POSITION:
      return data?.searchPositions.length;
    case SearchCondition.AREA:
      return data?.searchFences.length;
    case SearchCondition.ENTITY:
    default:
      return data?.searchEntities.length;
  }
}

/**
 * 搜索面板组件
 * @param {ISearchPanelProps} props
 * @returns {any}
 * @constructor
 */
const SearchPanel = (props: ISearchPanelProps) => {
  const {isShow, searchState, setIsShowSearchResult} = props;
  const {searchCondition, ...rest} = searchState;
  // 搜索面板Ref
  const searchPanelRef = useRef<HTMLUListElement>(null);
  /**
   * 触发document点击事件时处理搜索结果面板的显示状态
   * @param {MouseEvent} e
   */
  const domClick = (e: MouseEvent) => {
    const target = (e.target as HTMLElement);
    const {classList} = target;

    if (!(
      classList.contains('inter-plat-search-button') ||
      classList.contains('inter-plat-search-input') ||
      searchPanelRef.current?.contains(target as Node)
    )) {
      setIsShowSearchResult(false);
    }
  };

  useEffect(() => {
    // 隐藏搜索结果面板
    // 当单击目标不是文本框或搜索按钮时
    // 当单击点不在搜索面板范围以内时
    document.addEventListener('click', domClick);

    return () => {
      document.removeEventListener('click', domClick);
    };
  }, []);

  return (
    <StyledSearchPanel
      ref={searchPanelRef}
      dataLength={handleData(searchCondition!, rest)}
      isShow={isShow}
      className="inter-plat-search-display"
    >
      {handleSearchPanelElement(searchCondition!, rest)}
    </StyledSearchPanel>
  );
};

export default SearchPanel;
