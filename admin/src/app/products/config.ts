import { Product } from '@teslo/interfaces';
import React from 'react';

export interface ProductTable extends Product {
	priceFormatted?: string;
	actions: React.ReactNode;
	image: React.ReactNode;
	dateFormatted: string;
	sizesFormatted?: string;
	categoriesFormatted: React.ReactNode;
	providersFormatted: React.ReactNode;
	titleFormatted: React.ReactNode;
}
