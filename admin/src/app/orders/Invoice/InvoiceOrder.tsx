import Logo from '@/layouts/Logo';
import { useConfigEnterpriseStore } from '@/store';
import { APP_EMAIL, APP_NAME, APP_PHONE, capitalize, formatter, PF } from '@/utils';
import { Order } from '@teslo/interfaces';
import RenderIf from '@teslo/react-ui/RenderIf';
import dayjs from 'dayjs';
import * as React from 'react';
import { FaPrint } from 'react-icons/fa';

interface IInvoiceOrderProps {
	order: Order;
}

const InvoiceOrder: React.FunctionComponent<IInvoiceOrderProps> = props => {
	const { order } = props;
	const { configEnterprise } = useConfigEnterpriseStore();
	const { user } = order;
	return (
		<div className="tile">
			<section id="sPedido" className="text-xs">
				<div className="flex items-center">
					<div>
						<Logo type="streamline" />
					</div>

					<div className="text-right w-full">
						<strong>Date: </strong>
						{dayjs(order.dateCreated).format('DD/MM/YYYY')}
					</div>
				</div>

				<div className="grid grid-cols-3 gap-2 mt-8 mb-12">
					<div>
						Data Enterprise:
						<address className="mt-1">
							<RenderIf isTrue={configEnterprise.name}>
								<strong className="mb-2">
									{configEnterprise.name}
								</strong>
								<br />
							</RenderIf>
							<RenderIf isTrue={configEnterprise.phone}>
								<strong>Tel: </strong>{' '}
								{configEnterprise.phone}
								<br />
							</RenderIf>

							<RenderIf isTrue={configEnterprise.email}>
								<strong>Email: </strong> {APP_EMAIL}
								<br />
							</RenderIf>

							<a
								target="_blank"
								rel="noreferrer"
								href={'#!'}
							>
								{window.location.origin}
							</a>
						</address>
					</div>
					<div>
						To:
						<address className="mt-1">
							<strong>
								{user.firstName} {user.lastName}
							</strong>
							<br />
							<b>Tel:</b> {user.phone} <br />
							<b>Email:</b> {user.email} <br />
						</address>
					</div>
					<div>
						<b>Order #</b> {order.idorder} <br />
						<b>Reference:</b> {order.reference}
						<br />
						<b>Status:</b> {capitalize(order.status)} <br />
						<b>Total:</b> {formatter.format(order.total)}
						<br />
						{/* <b>Tipo Pago:</b> {tipopago.nombre} */}
						<br />
					</div>
				</div>

				<div className="table-responsive my-6 shadow">
					<table className="table">
						<thead>
							<tr>
								<th className="text-dark">
									Product
								</th>
								<th className="text-center text-dark">
									Price
								</th>
								<th className="text-center text-dark">
									Quantity
								</th>
								<th className="text-center text-dark">
									Total Ammount
								</th>
							</tr>
						</thead>
						<tbody>
							{order.detail.map(item => (
								<tr>
									<td>
										<div className="flex items-center">
											<span>
												<img
													src={
														item
															.product
															.images[0]
															? PF +
															  `/product/${item.product.images[0]}`
															: '/img/others/box.png'
													}
													alt={
														''
													}
													width={
														40
													}
													className={
														'mr-2'
													}
												/>
											</span>
											{item.title}
										</div>
									</td>
									<td className="text-center">
										{formatter.format(
											item.total
										)}
									</td>
									<td className="text-center">
										{item.quantity}
									</td>
									<td className="text-center">
										{formatter.format(
											item.total *
												item.quantity
										)}
									</td>
								</tr>
							))}
						</tbody>
						<tfoot>
							<tr>
								<td
									colSpan={3}
									className="text-right font-bold"
								>
									Total:
								</td>
								<td className="text-center">
									{formatter.format(
										order.total
									)}
								</td>
							</tr>
						</tfoot>
					</table>
				</div>

				<div className="print:hidden mt-2">
					<div className="text-right">
						<button
							className="btn btn-primary btn-xs"
							onClick={() => window.print()}
						>
							<FaPrint className="mr-1.5" /> Imprimir
						</button>
					</div>
				</div>
			</section>
		</div>
	);
};

export default InvoiceOrder;

/* import { FaPrint } from 'react-icons/fa';
import { useConfigContext } from '../../../../../context/configuracion/ConfigState';
import Tile from '../../../../layout/common/Tile';
import { PF, RADMIN, SMONEY } from '../../../../utils';
import { DetallePago, PagoType } from '../../interfaces';
import * as moment from 'moment';
import * as React from 'react';
import { useAuthContext } from '../../../../../context/autenticacion/authState';

interface IInvoicePagoProps {
	pago: PagoType;
	children?: React.ReactNode;
}

const InvoicePedido: React.FunctionComponent<IInvoicePagoProps> = props => {
	const { pago } = props;
	const { user, detallesPago, referenciacobro, tipopago, status, fecha_cargo, monto } = pago;
	const { usuario } = useAuthContext();
	const { configuracion } = useConfigContext();
	const fecha = moment(fecha_cargo).format('DD/MM/YYYY');

	return (
		<Tile>
			<section id="sPedido" style={{ fontSize: '14px' }} className="invoice">
				<div className="row mb-4">
					<div className="col-6">
						<h2 className="page-header">
							<img
								width={50}
								src={'/cedes-imagotipo.png'}
								alt="Cedees Logo"
							/>
						</h2>
					</div>
					<div className="col-6">
						<p className="text-right d-block">Fecha: {fecha}</p>
					</div>
				</div>
				<div className="row invoice-info">
					<div className="col-4">
						Datos Cedees:
						<address>
							<strong>{configuracion.nombre}</strong>
							<br />
							<strong>Tel: </strong>{' '}
							{configuracion.telefono}
							<br />
							<strong>Correo: </strong>{' '}
							{configuracion.correo}
							<br />
							{configuracion.direccion ? (
								<React.Fragment>
									<strong>Dirección: </strong>{' '}
									{configuracion.direccion}
									<br />
								</React.Fragment>
							) : null}
							{configuracion.web ? (
								<a
									target="_blank"
									rel="noreferrer"
									href={configuracion.web}
								>
									{configuracion.web}
								</a>
							) : null}
						</address>
					</div>
					<div className="col-4">
						Para:
						<address>
							<strong>
								{user.nombres} {user.apellidos}
							</strong>
							<br />
							<b>Tel:</b> {user.telefono} <br />
							<b>Email:</b> {user.email_user} <br />
						</address>
					</div>
					<div className="col-4">
						<b>Orden #</b> {pago.idpago} <br />
						<b>Transacción:</b> {referenciacobro}
						<br />
						<b>Estado:</b> {status} <br />
						<b>Monto:</b> {monto + SMONEY}
						<br />
						<b>Tipo Pago:</b> {tipopago.nombre}
						<br />
					</div>
				</div>
				<TableDetalle detalle={detallesPago} total={monto} />
				<div className="row justify-content-center">
					<div className="col-lg-6 text-center">
						{usuario.rol.idrol === RADMIN
							? props.children
							: null}
					</div>
				</div>
				<RowPrint />
			</section>
		</Tile>
	);
};
export default InvoicePedido;

const RowPrint: React.FunctionComponent = () => (
	<div className="row d-print-none mt-2">
		<div className="col-12 text-right">
			<button className="btn btn-primary" onClick={() => window.print()}>
				<FaPrint /> Imprimir
			</button>
		</div>
	</div>
);

interface ITableDetalleProps {
	detalle: DetallePago[];
	total: number;
}
const TableDetalle: React.FunctionComponent<ITableDetalleProps> = ({ detalle, total }) => (
	<div className="table-responsive">
		<table className="table table-striped">
			<thead>
				<tr>
					<th className="text-dark">Descripción</th>
					<th className="text-center text-dark">Precio</th>
					<th className="text-center text-dark">Cantidad</th>
					<th className="text-center text-dark">Importe</th>
				</tr>
			</thead>
			<tbody>
				{detalle.map((d, index) => (
					<TrDetallePago detalle={d} key={index} />
				))}
			</tbody>
			<tfoot>
				<tr>
					<th colSpan={3} className="text-right">
						Total:
					</th>
					<td className="text-center">
						{total}
						{SMONEY}
					</td>
				</tr>
			</tfoot>
		</table>
	</div>
);

interface ITrDetallePagoProps {
	detalle: DetallePago;
}

const TrDetallePago: React.FunctionComponent<ITrDetallePagoProps> = props => {
	const { detalle } = props;
	const { horario, monto } = detalle;
	const seccion = horario.seccion;
	const nivel = seccion.nivel;
	const idioma = nivel.idioma;
	return (
		<tr>
			<td>
				<img
					src={PF + idioma.icono}
					alt={''}
					width={40}
					className={'mr-2'}
				/>
				{idioma.titulo} - {nivel.descripcion} - {horario.descripcion}
					{horario.idhorario} *
			</td>
			<td className="text-center">{monto + SMONEY}</td>
			<td className="text-center">1</td>
			<td className="text-center">{monto + SMONEY}</td>
		</tr>
	);
}; */
