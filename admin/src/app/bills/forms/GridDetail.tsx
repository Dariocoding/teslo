import InputFormik from '@/components/@forms/InputFormik';
import SearchList from '@/components/@forms/SearchList';
import { formatter } from '@/utils';
import { BillDto, DetailBillDto } from '@teslo/interfaces';
import RenderIf from '@teslo/react-ui/RenderIf';
import classNames from 'classnames';
import { useFormikContext } from 'formik';
import * as React from 'react';
import { TbWashDrycleanOff } from 'react-icons/tb';
import { MdCleaningServices } from 'react-icons/md';
import { ShowIf } from 'react-rainbow-components';
import { useGridDetail } from './useGridDetail';

interface IGridDetailProps {
	detail: DetailBillDto;
	idx: number;
}

const GridDetail: React.FunctionComponent<IGridDetailProps> = props => {
	const { detail, idx } = props;
	const { values } = useFormikContext<BillDto>();
	const {
		onBlur,
		onFocus,
		stateProducts,
		loading,
		onTrashProduct,
		focused,
		onCleanProduct,
		nameInput,
		nameInputPrice,
		nameInputQty,
		codeProductInput,
		ammount,
		onClickResult,
	} = useGridDetail(detail, idx);

	return (
		<div className="grid xl:grid-cols-7 lg:col-span-8 gap-x-4 gap-y-2">
			<div
				className="xl:col-span-1 lg:col-span-4 container-input-code"
				onBlur={onBlur}
				onFocus={onFocus}
			>
				<InputFormik
					name={codeProductInput}
					label={'Code Product'}
					placeholder="Code product"
					className="mb-0"
					classNameInput="form-control-sm"
					classNameLabel="text-xs"
					showError={false}
					showSuccess={false}
					autoComplete="off"
				/>
				<RenderIf isTrue={focused}>
					<SearchList
						onClickResult={onClickResult}
						classNameContainer="min-w-[300px] search-list-products"
						results={stateProducts.map(product => ({
							label: product.title,
							value: product.id,
						}))}
						loading={loading}
					/>
				</RenderIf>
			</div>
			<div className="col-span-2">
				<InputFormik
					name={nameInput}
					label={'Product'}
					placeholder="Name product"
					className="mb-0"
					classNameInput="form-control-sm"
					classNameLabel="text-xs"
					showError={false}
					showSuccess={false}
					disabled={true}
				/>
			</div>
			<div>
				<InputFormik
					type="number"
					decimalValues={false}
					name={nameInputQty}
					label={'Qty'}
					placeholder="Type your qty"
					className="mb-0"
					classNameInput="form-control-sm"
					classNameLabel="text-xs"
					showError={false}
					showSuccess={false}
					disabled={!detail.product?.title}
				/>
			</div>
			<div>
				<InputFormik
					type="number"
					decimalValues={true}
					name={nameInputPrice}
					label={'Price'}
					placeholder="Type your price"
					className="mb-0"
					classNameInput="form-control-sm"
					classNameLabel="text-xs"
					showError={false}
					showSuccess={false}
					disabled={!detail.product?.title}
				/>
			</div>
			<div className="text-sm">
				<h6 className="text-xs font-normal">Ammount</h6>{' '}
				<span className="mt-3 block">
					{ammount ? formatter.format(ammount) : '-'}
				</span>
			</div>
			<div className="text-sm">
				<h6 className="text-xs font-normal">Actions</h6>{' '}
				<div className="mt-1.5 flex items-center justify-start">
					<button
						type="button"
						disabled={values.details.length === 1}
						className={classNames(
							values.details.length > 1
								? 'btn-outline-danger'
								: 'border-gray-300 border text-gray-400 hover:bg-gray-300 hover:text-gray-100',
							'btn btn-xs shadow-none cursor-pointer mb-0'
						)}
						onClick={onTrashProduct}
					>
						<TbWashDrycleanOff />
					</button>
					<ShowIf
						isTrue={detail.product?.title}
						className="inline-block"
					>
						<button
							type="button"
							className={classNames(
								'btn btn-xs shadow-none cursor-pointer mb-0 btn-outline-warning'
							)}
							onClick={onCleanProduct}
						>
							<MdCleaningServices />
						</button>
					</ShowIf>
				</div>
			</div>
		</div>
	);
};

export default GridDetail;
