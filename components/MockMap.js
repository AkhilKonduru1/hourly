import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

// Interactive Map Component using Apple MapKit JS via WebView
export default function MockMap({ style, region, children }) {
  const webViewRef = useRef(null);
  
  // Extract markers from children
  const markers = React.Children.toArray(children).map((child, index) => {
    if (child && child.props && child.props.coordinate) {
      return {
        id: index,
        lat: child.props.coordinate.latitude,
        lng: child.props.coordinate.longitude,
        title: child.props.title || '',
        description: child.props.description || '',
      };
    }
    return null;
  }).filter(Boolean);

  const lat = region?.latitude || 30.5022;
  const lng = region?.longitude || -97.8202;
  const span = region?.latitudeDelta || 0.1;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <script src="https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.core.js" crossorigin="anonymous"></script>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { margin: 0; padding: 0; overflow: hidden; }
        #map { 
          width: 100vw; 
          height: 100vh; 
        }
        .custom-annotation {
          font-size: 32px;
          cursor: pointer;
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        // Initialize MapKit with a token
        // Note: For production, you'd need a proper MapKit JS token from Apple
        // For demo purposes, we'll use a basic setup
        
        try {
          mapkit.init({
            authorizationCallback: function(done) {
              // For demo - in production you'd fetch a token from your server
              done('demo-token');
            },
            language: 'en'
          });

          var map = new mapkit.Map("map", {
            center: new mapkit.Coordinate(${lat}, ${lng}),
            span: new mapkit.CoordinateSpan(${span}, ${span}),
            mapType: mapkit.Map.MapTypes.Standard,
            showsMapTypeControl: false,
            showsZoomControl: true,
            showsUserLocationControl: false,
            showsPointsOfInterest: true,
            showsScale: mapkit.FeatureVisibility.Hidden
          });

          var markers = ${JSON.stringify(markers)};
          
          markers.forEach(function(marker) {
            var coordinate = new mapkit.Coordinate(marker.lat, marker.lng);
            
            // Create custom annotation
            var annotation = new mapkit.MarkerAnnotation(coordinate, {
              title: marker.title,
              subtitle: marker.description,
              color: "#4CAF50",
              glyphText: "📍"
            });
            
            map.addAnnotation(annotation);
          });
        } catch(e) {
          // Fallback to OpenStreetMap if MapKit fails to load
          document.getElementById('map').innerHTML = '<div style="width:100%;height:100%;background:#E8F4F8;display:flex;align-items:center;justify-content:center;font-family:sans-serif;color:#666;padding:20px;text-align:center;">Map loading... If you see this message, the map is initializing. Apple Maps may require custom build.</div>';
          
          // Use Leaflet as fallback
          var script = document.createElement('script');
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          script.onload = function() {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            document.head.appendChild(link);
            
            setTimeout(function() {
              document.getElementById('map').innerHTML = '';
              var leafletMap = L.map('map').setView([${lat}, ${lng}], 13);
              L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
              }).addTo(leafletMap);
              
              var markers = ${JSON.stringify(markers)};
              markers.forEach(function(m) {
                var icon = L.divIcon({
                  className: 'custom-marker',
                  html: '📍',
                  iconSize: [32, 32],
                  iconAnchor: [16, 32]
                });
                var marker = L.marker([m.lat, m.lng], { icon: icon }).addTo(leafletMap);
                if (m.title || m.description) {
                  marker.bindPopup('<strong>' + m.title + '</strong><br/>' + m.description);
                }
              });
            }, 100);
          };
          document.head.appendChild(script);
        }
      </script>
    </body>
    </html>
  `;

  return (
    <View style={[styles.mapContainer, style]}>
      <WebView
        ref={webViewRef}
        source={{ html: htmlContent }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4CAF50" />
          </View>
        )}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
      />
    </View>
  );
}

// Mock Marker Component (for API compatibility)
export function Marker({ coordinate, title, description, onCalloutPress, children }) {
  // This component doesn't render anything - markers are handled by the WebView map
  return null;
}

const styles = StyleSheet.create({
  mapContainer: {
    overflow: 'hidden',
    backgroundColor: '#E8F4F8',
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8F4F8',
  },
});
