import React, { useState, useMemo } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import { useData } from '../contexts/DataContext';
import { REGION_COLORS, AFFILIATE_STYLE } from '../constants';
import { AssociationMember } from '../types';

// World map TopoJSON
const GEO_URL =
  'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

interface MapSystemProps {
  onSelectAssociation: (assoc: AssociationMember) => void;
  selectedId: string | undefined;
}

const MapSystem: React.FC<MapSystemProps> = ({
  onSelectAssociation,
  selectedId,
}) => {
  const { members, language } = useData(); // Consume data and language
  const [position, setPosition] = useState<{
    coordinates: [number, number];
    zoom: number;
  }>({
    coordinates: [0, 10], 
    zoom: 1,
  });

  const handleMoveEnd = (position: { coordinates: [number, number]; zoom: number }) => {
    setPosition(position);
  };

  const isZoomedIn = position.zoom >= 2;

  // 核心过滤逻辑：只显示 Active 的 协会成员 (从动态数据源过滤)
  const activeAssociations = useMemo(() => {
    return members.filter(
      (m) => m.status === 'active' && m.memberCategory === 'association'
    );
  }, [members]); // Re-calculate when members change

  return (
    <div className="w-full h-full bg-[#F8FAFC] relative overflow-hidden">
      <ComposableMap
        projectionConfig={{ scale: 170, center: [0, 0] }}
        width={1000}
        height={600}
        className="w-full h-full"
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
          minZoom={1}
          maxZoom={10}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo: any) => {
                const defaultFill = '#E2E8F0'; 
                const hoverFill = '#CBD5E1';
                
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill: defaultFill,
                        stroke: '#FFFFFF',
                        strokeWidth: 0.75,
                        outline: 'none',
                        transition: 'fill 0.3s ease',
                      },
                      hover: {
                        fill: hoverFill,
                        stroke: '#FFFFFF',
                        strokeWidth: 1,
                        outline: 'none',
                      },
                      pressed: {
                        fill: '#94A3B8',
                        outline: 'none',
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {activeAssociations.map((assoc) => {
            const isAffiliate = assoc.memberType === 'Affiliate';
            const isSelected = selectedId === assoc.id;

            const markerColor = isAffiliate
              ? AFFILIATE_STYLE.fill
              : REGION_COLORS[assoc.region].fill;

            // Determine name to show in tooltip based on language
            const tooltipContent = language === 'zh' 
                ? `${assoc.abbreviation}｜${assoc.nameCN}` 
                : `${assoc.abbreviation}｜${assoc.nameEN}`;

            return (
              <Marker
                key={assoc.id}
                coordinates={[
                  assoc.coordinates.lng,
                  assoc.coordinates.lat,
                ]}
                onClick={(e) => {
                  e.nativeEvent.stopImmediatePropagation();
                  e.stopPropagation();
                  onSelectAssociation(assoc);
                }}
              >
                <circle
                  r={isZoomedIn ? 14 : 6}
                  fill="transparent"
                  className="cursor-pointer"
                  style={{ pointerEvents: 'all' }} 
                />

                <g
                  className="cursor-pointer transition-all duration-300"
                  data-tooltip-id="map-tooltip"
                  data-tooltip-content={tooltipContent}
                >
                  {(isSelected) && (
                    <circle
                      r={isZoomedIn ? 12 : 6}
                      fill="none"
                      stroke={markerColor}
                      strokeWidth={1.5}
                      className="animate-ping opacity-75"
                    />
                  )}
                  
                   <circle
                      r={isZoomedIn ? 8 : 4}
                      fill={isSelected ? '#fff' : 'transparent'}
                      stroke={markerColor}
                      strokeWidth={1}
                      strokeDasharray={isAffiliate ? '2,2' : '0'}
                      className={isSelected ? 'opacity-100' : 'opacity-80'}
                    />

                  <circle
                    r={isZoomedIn ? 5 : 2.5}
                    fill={markerColor}
                    stroke="#fff"
                    strokeWidth={isSelected ? 1.5 : 0.8}
                    className="transition-transform origin-center hover:scale-125"
                  />

                  {isZoomedIn && (
                    <text
                      textAnchor="middle"
                      y={-10}
                      style={{
                        fontFamily: 'Noto Sans SC',
                        fontSize: isSelected ? '8px' : '6px',
                        fontWeight: isSelected ? 'bold' : '500',
                        fill: '#0f172a',
                        pointerEvents: 'none',
                        textShadow: '0 1px 2px rgba(255,255,255,1)',
                      }}
                    >
                      {assoc.abbreviation}
                    </text>
                  )}
                </g>
              </Marker>
            );
          })}
        </ZoomableGroup>
      </ComposableMap>

      <Tooltip
        id="map-tooltip"
        place="top"
        style={{
          backgroundColor: '#0f172a',
          color: '#f8fafc',
          fontSize: '12px',
          padding: '6px 10px',
          borderRadius: '6px',
          zIndex: 50,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        }}
      />
    </div>
  );
};

export default MapSystem;