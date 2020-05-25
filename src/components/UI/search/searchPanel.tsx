/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 搜索结果面板组件
 * @Date: 2020-03-30 周一 14:03:30
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-25 周一 10:07:54
 */

import Icon, { IconSource, IconSourceHover } from '@/components/UI/iconComp';
import { ISearchProps } from '@/components/UI/search/index';
import { POI } from '@/containers/UI/amap';
import { EntityType } from '@/models/UI/entity';
import { FenceType } from '@/models/UI/fence';
import { monitorTypeIcon, SearchCondition } from '@/models/UI/search';
import { message } from 'antd';
import React, { useEffect, useRef } from 'react';
import styled, { StyledComponent } from 'styled-components';

/**
 * 搜索面板props接口
 */
export interface ISearchPanelProps {
  searchState?: ISearchState & SearchResultData
  setState?: ISearchModel['effects']['setState']
  mapDispatch?: IAMapModel['effects']
  fenceDispatch?: IFenceModel['effects']
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
  const {searchState, mapDispatch, fenceDispatch, setState} = props;
  const {fetchWindowInfo, setState: setMapState} = mapDispatch!;
  const {fetchDetails} = fenceDispatch!;
  const {searchCondition, isShowResultPanel, ...rest} = searchState!;

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
      setState!({isShowResultPanel: false});
    }
  };

  /**
   * 处理监控对象点击事件
   * @param {IEntity} entity
   * @returns {Promise<void>}
   */
  const handleEntityClick = async (entity: IEntity) => {
    const {monitorId, monitorType} = entity;

    // 设置当前激活的搜索面板的项
    setState!({
      target: {
        id: monitorId!,
        type: monitorType!
      }
    });

    // 请求弹窗内的数据
    const response = await fetchWindowInfo({
      monitorId: monitorId!,
      monitorType: monitorType
    });

    if (+response.retCode === 0) {
      setMapState({curMassPoint: response.data});
    } else {
      message.error('获取信息失败，请稍候再试！');

      // 更新当前海量点弹窗信息未成功时，清空当前激活的搜索面板的项
      setState!({target: undefined});
    }
  };

  /**
   * 处理区域（围栏）点击事件
   * @param {IFence} fence
   * @returns {Promise<void>}
   */
  const handleFenceClick = async (fence: IFence) => {
    const {id} = fence;

    // 请求弹窗内的数据
    const response = await fetchDetails({
      fenceId: id,
      queryType: 1,
      fenceType: fence.objType
    });

    if (+response.retCode === 0) {
      // 设置当前激活的搜索面板的项
      setState!({
        target: {
          id,
          type: 'area',
          details: response.data.fenceDetails
        }
      });

      setMapState({curArea: response.data});
    } else {
      message.error('获取信息失败，请稍候再试！');

      // 更新当前区域弹窗信息未成功时，清空当前激活的搜索面板的项
      setState!({target: undefined});
    }
  };

  /**
   * 处理搜索结果面板数据
   * @returns {any}
   */
  const handleSearchPanelElement = () => {
    switch (searchCondition) {
      case SearchCondition.AREA:
        return (
          rest?.searchFences.map((item: IFence, index: number) => (
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
                        onClick={handleFenceClick.bind(null, fence)}
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
          rest?.searchEntities.map((entity: IEntity, index: number) => {
            return (
              <li className="inter-plat-search-display-item" key={`monitor-item-${index}`}>
                <Icon
                  text={entity.monitorName}
                  icon={monitorTypeIcon[entity.monitorType! as EntityType] as IconSource}
                  iconHover={monitorTypeIcon[`${entity.monitorType}_hover`] as IconSourceHover}
                  onClick={handleEntityClick.bind(null, entity)}
                />
              </li>
            );
          }) ?? <div>暂无数据</div>
        );
    }
  };

  useEffect(() => {
    // 隐藏搜索结果面板
    // - 当单击目标不是文本框或搜索按钮时
    // - 当单击点不在搜索面板范围以内时
    window.addEventListener('click', domClick);

    return () => {
      window.removeEventListener('click', domClick);
    };
  }, []);

  return (
    <StyledSearchPanel
      ref={searchPanelRef}
      dataLength={handleData(searchCondition!, rest)}
      isShow={isShowResultPanel}
      className="inter-plat-search-display"
    >
      {handleSearchPanelElement()}
    </StyledSearchPanel>
  );
};

export default SearchPanel;
