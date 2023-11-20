import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import * as vector from 'esri-leaflet-vector';
import * as esri from 'esri-leaflet';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map!: L.Map;
  private showMap: boolean = false;
  private selectedRegion: string = ''; // Default region

  private colorFeatureLayer: any; // Variable to store the current feature layer


  ngOnInit(): void {
    this.map = L.map('map').setView([0, 0], 2);
    this.showMap = false;
    this.addMapLayers();

  }

  onRegionChange(event: any): void {
    this.selectedRegion = event.target.value;
    this.showMap = true;
    this.updateMapStyle();
   
  }

  

  private addMapLayers(): void {
    const basemapUrl = 'https://tiles.arcgis.com/tiles/5T5nSi527N4F7luB/arcgis/rest/services/WHO_Polygon_Basemap_Dark_Grey/VectorTileServer';
    const featureUrl = 'https://services.arcgis.com/5T5nSi527N4F7luB/arcgis/rest/services/DASH_PUBLIC_INCIDENTS/FeatureServer/0';

    const layer = vector.vectorTileLayer(basemapUrl, {
      minZoom: 1,
      maxZoom: 13,
    });
    if (this.colorFeatureLayer) {
      this.colorFeatureLayer.remove();
    }

    layer.addTo(this.map);
    //this.colorFeatureLayer.addTo(this.map);


  }
  
  private updateMapStyle(): void {

    if (this.colorFeatureLayer) {
      this.colorFeatureLayer.remove();
    }
    this.colorFeatureLayer = esri.featureLayer({
      url: 'https://services.arcgis.com/5T5nSi527N4F7luB/arcgis/rest/services/DASH_PUBLIC_INCIDENTS/FeatureServer/0',
      style: (feature) => this.getStyle(feature)
    });
    this.colorFeatureLayer.addTo(this.map);
  }


  private getStyle(feature: any): any {
    // Define styling based on the selected region
    const region = feature.properties.region;
    const defaultStyle = {
      weight: 0.4,
      opacity: 0.8,
      fillOpacity: 0.55,
      color: 'grey'
    };

    if (region === this.selectedRegion) {
      switch (region) {
        case 'SEARO':
          this.map.setView([15.11989876, 101.01490782], 4)
          return {
            ...defaultStyle,
            color: 'blue'
          };


        case 'AFRO':
          this.map.setView( [2.4601811810210052, 22.851562500000004], 2.5)
          return {
            ...defaultStyle,
            color: 'green'
          };

        case 'AMRO':
          this.map.setView([19.907258, -90.328734], 2)
          return {
            ...defaultStyle,
            color: 'red'
          };
        case 'EMRO':
          this.map.setView([27.68352808378776, 43.59375000000001], 3)
          return {
            ...defaultStyle,
            color: 'orange'
          };
        case 'EURO':
          this.map.setView([64.47279382008166, 50.62500000000001], 2)
          return {
            ...defaultStyle,
            color: 'purple'
          };
        case 'WPRO':
          this.map.setView( [9.44906182688142, 124.45312500000001], 2)
          return {
            ...defaultStyle,
            color: 'yellow'
          };

        default:
          
          break;
      }
    }



    return defaultStyle;
  }
}