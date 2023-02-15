import { Category } from '@teslo/interfaces';
import React from 'react';

export interface CategoryDataTable extends Category {
	actions: React.ReactNode;
	imgTable: React.ReactNode;
	dateFormatted: string;
}
