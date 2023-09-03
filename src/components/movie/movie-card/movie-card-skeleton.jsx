import { Skeleton, Box, Card, Paper, CardContent } from '@mui/material';

function MovieCardSkeleton() {
	return (
		<Card sx={{ width: '280px', height: '330px', margin: '5px' }}>
			<Paper
				elevation={3}
				sx={{
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<Skeleton variant='rectangular' width={280} height={140} />
				<CardContent
					sx={{
						flexGrow: 1,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
					}}
				>
					<div>
						<Skeleton />
					</div>
					<Box component='div'>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<Skeleton width={80} />
						</div>
					</Box>
				</CardContent>
			</Paper>
		</Card>
	);
}

export { MovieCardSkeleton };
