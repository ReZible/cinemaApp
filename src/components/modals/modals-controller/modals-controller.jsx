import { useSelector } from 'react-redux';
import { SignIn } from '../authorization/authorization';
import { MODALS } from '../../../store/reducers/modals-reducer';

function ModalsController() {
	const activeModal = useSelector((store) => store.modal.activeModal);

	switch (activeModal) {
		case MODALS.AUTHORIZATION: {
			return <SignIn />;
		}
		default: {
			return null;
		}
	}
}

export { ModalsController };
