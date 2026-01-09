'use client'

import { useEffect, useRef } from 'react'

interface GoogleMapProps {
  address: string
  lat?: number
  lng?: number
  zoom?: number
  className?: string
}

export function GoogleMap({
  address,
  lat = -8.0476,
  lng = -34.8770,
  zoom = 15,
  className = 'h-64 md:h-96 w-full rounded-lg',
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current) return

    // Carregar o script do Google Maps se ainda não estiver carregado
    if (!window.google) {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = initMap
      document.head.appendChild(script)
    } else {
      initMap()
    }

    function initMap() {
      if (!mapRef.current || !window.google) return

      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
        ],
      })

      // Marcador
      const marker = new window.google.maps.Marker({
        position: { lat, lng },
        map,
        title: address,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#FF6B35',
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 3,
        },
      })

      // Info Window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 10px;">
            <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #FF6B35;">Instituto Fenix</h3>
            <p style="margin: 0; color: #666;">${address}</p>
          </div>
        `,
      })

      marker.addListener('click', () => {
        infoWindow.open(map, marker)
      })

      // Abrir info window por padrão
      infoWindow.open(map, marker)
    }
  }, [address, lat, lng, zoom])

  return (
    <div className={className}>
      <div ref={mapRef} className="w-full h-full rounded-lg" />
      {/* Fallback se Google Maps não carregar */}
      <div className="mt-4 text-center">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 hover:text-primary-700 font-medium text-sm"
        >
          Abrir no Google Maps →
        </a>
      </div>
    </div>
  )
}

// Declaração de tipos para TypeScript
declare global {
  interface Window {
    google?: {
      maps: {
        Map: new (element: HTMLElement, options?: any) => any
        Marker: new (options?: any) => any
        InfoWindow: new (options?: any) => any
        SymbolPath: {
          CIRCLE: number
        }
      }
    }
  }
}

