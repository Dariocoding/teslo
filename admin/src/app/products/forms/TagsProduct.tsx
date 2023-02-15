import Label from '@/components/@forms/label';
import RenderIf from '@teslo/react-ui/RenderIf';
import { getIn, useFormikContext } from 'formik';
import * as React from 'react';
import { AiFillFolderOpen } from 'react-icons/ai';
import { TbFoldersOff } from 'react-icons/tb';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { ProductDto } from '@teslo/interfaces';

interface ITagsProductProps {}

const TagsProduct: React.FunctionComponent<ITagsProductProps> = props => {
	const {} = props;
	const { values, setFieldValue } = useFormikContext<ProductDto>();
	const tags = getIn(values, 'tags') as string[];
	const [open, setOpen] = React.useState(tags.length === 0);
	const [tempInput, setTempInput] = React.useState('');

	const toggleOpen = () => setOpen(!open);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTempInput(e.target.value);
	};

	const onSubmitTempInput = () => {
		if (!tempInput.trim()) toast.success('Please type a tag name');
		setFieldValue('tags', [tempInput, ...tags]);
		setTempInput('');
		setOpen(false);
	};

	React.useEffect(() => {
		if (!open || !tags.length) setTempInput('');
	}, [open, tags.length]);

	return (
		<div className="form-group">
			<div className="flex justify-between items-center mb-1.5">
				<Label className="text-sm">Tags</Label>
				<RenderIf isTrue={tags.length}>
					<button
						onClick={toggleOpen}
						className="btn btn-success btn-sm"
						type="button"
					>
						{open ? <AiFillFolderOpen /> : <TbFoldersOff />}
					</button>
				</RenderIf>
			</div>

			<div>
				<RenderIf isTrue={tags.length && !open}>{tags.join(', ')}</RenderIf>
				<RenderIf isTrue={!tags.length || open}>
					<div className="flex items-center justify-center space-x-2">
						<div className="w-full">
							<input
								type="text"
								className="form-control form-control-sm"
								onChange={onChange}
								value={tempInput}
								placeholder={'Type a tag'}
							/>
						</div>
						<span>
							<button
								type="button"
								onClick={onSubmitTempInput}
								className="btn btn-primary btn-xs h-full w-full mt-1"
							>
								<FaPlus />
							</button>
						</span>
					</div>
				</RenderIf>
			</div>
		</div>
	);
};

export default TagsProduct;
