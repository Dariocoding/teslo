import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
    description: 'Product ID',
    uniqueItems: true,
  })
  @IsString()
  @MinLength(2)
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  image?: string;
}

/* @ApiProperty({
   example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
   description: 'Product ID',
   uniqueItems: true,
 })
 @PrimaryGeneratedColumn('uuid')
 idcategory: string;

 @ApiProperty({
   example: 'T-Shirt Teslo',
   description: 'Product Title',
   uniqueItems: true,
 })
 @Column('text', {
   unique: true,
 })
 title: string;

 @Column('text', {
   unique: true,
 })
 slug: string;

 @Column('text')
 image: string; */
