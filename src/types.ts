/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  category: 'chaveiro' | 'caneta' | 'outros';
  displayCategory: string;
  price: number;
  imageUrl: string;
  description: string;
  details?: string[];
  isCustomizable: boolean;
}

export interface CustomOption {
  id: string;
  name: string;
  priceModifier?: number;
  colorCode?: string;
  previewClass?: string;
}

export interface CustomizationState {
  baseColor: string;
  filler: string;
  accessory: string;
  customName: string;
  textPosition: 'centro' | 'base' | 'topo';
  hasPhoto: boolean;
  photoUrl?: string;
  customDetails: string;
}
