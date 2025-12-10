import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";

interface PropertyFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  propertyType: string;
  onPropertyTypeChange: (value: string) => void;
  priceRange: string;
  onPriceRangeChange: (value: string) => void;
  bedrooms: string;
  onBedroomsChange: (value: string) => void;
}

const PropertyFilters = ({
  searchQuery,
  onSearchChange,
  propertyType,
  onPropertyTypeChange,
  priceRange,
  onPriceRangeChange,
  bedrooms,
  onBedroomsChange,
}: PropertyFiltersProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-4 lg:p-6 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by location"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <Select value={propertyType} onValueChange={onPropertyTypeChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priceRange} onValueChange={onPriceRangeChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Price</SelectItem>
              <SelectItem value="0-1500">$0 - $1,500</SelectItem>
              <SelectItem value="1500-2500">$1,500 - $2,500</SelectItem>
              <SelectItem value="2500-4000">$2,500 - $4,000</SelectItem>
              <SelectItem value="4000+">$4,000+</SelectItem>
            </SelectContent>
          </Select>

          <Select value={bedrooms} onValueChange={onBedroomsChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Bedrooms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Beds</SelectItem>
              <SelectItem value="1">1 Bed</SelectItem>
              <SelectItem value="2">2 Beds</SelectItem>
              <SelectItem value="3">3 Beds</SelectItem>
              <SelectItem value="4+">4+ Beds</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            More Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilters;
