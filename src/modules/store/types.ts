export interface CompaniesDto {
  id: number;
  business_name: string;
  registration_name: string;
  ruc: string;
  website: string;
}

export interface CategoriesDto {
  id: number;
  name: string;
}

export interface ProductsDto {
  id: number;
  company: number;
  business_name: string;
  registration_name: string;
  gtin_type: string;
  gtin: number;
  categories: number[];
}

interface GenericRulesField {
  required: boolean;
}

export interface GenericField {
  name: string;
  label: string;
  type: string;
  rules: GenericRulesField[];
}
