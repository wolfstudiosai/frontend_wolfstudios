import { formatCompactNumber } from '/src/utils/helper';
import DateEditCell from '/src/components/data-table/date-edit-cell';

export const getProductionColumns = () => {
    return [
        { field: 'name', headerName: 'Name', width: 280, editable: true },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            editable: true,
            valueGetter: (value, row) => row.status.join(', '),
        },
        {
            field: 'proposedDate',
            headerName: 'Proposed Date',
            width: 200,
            editable: true,
            renderEditCell: (params) => <DateEditCell {...params} format="YYYY-MM-DD" />
        },
        {
            field: 'recordShootDate',
            headerName: 'Record Shoot Date',
            width: 200,
            editable: true,
            renderEditCell: (params) => <DateEditCell {...params} format="YYYY-MM-DD" />
        },
        {
            field: 'internalNotes',
            headerName: 'Internal Notes',
            width: 180,
            editable: true,
        },
        {
            field: 'totalExpense',
            headerName: 'Total Expense',
            width: 100,
            editable: true,
            valueGetter: (value, row) => formatCompactNumber(row.totalExpense)
        },
        {
            field: 'spaceExpense',
            headerName: 'Space Expense',
            width: 100,
            editable: true,
            valueGetter: (value, row) => formatCompactNumber(row.spaceExpense)
        },
        {
            field: 'talentExpense',
            headerName: 'Talent Expense',
            width: 100,
            editable: true,
            valueGetter: (value, row) => formatCompactNumber(row.talentExpense)
        },
        {
            field: 'crewExpense',
            headerName: 'Crew Expense',
            width: 100,
            editable: true,
            valueGetter: (value, row) => formatCompactNumber(row.crewExpense)
        },
        {
            field: 'foodExpense',
            headerName: 'Food Expense',
            width: 100,
            editable: true,
            valueGetter: (value, row) => formatCompactNumber(row.foodExpense)
        },
        {
            field: 'equipmentRentals',
            headerName: 'Equipment Rentals',
            width: 100,
            editable: true,
            valueGetter: (value, row) => formatCompactNumber(row.equipmentRentals)
        },
        {
            field: 'equipmentExpense',
            headerName: 'Equipment Expense',
            width: 100,
            editable: true,
            valueGetter: (value, row) => formatCompactNumber(row.equipmentExpense)
        },
        {
            field: 'googleDriveFiles',
            headerName: 'Google Drive Files',
            width: 200,
            editable: true
        },
        {
            field: 'productionUsage',
            headerName: 'Production Usage',
            width: 200,
            editable: true
        },
        {
            field: 'directorExpense',
            headerName: 'Director Expense',
            width: 100,
            editable: true,
            valueGetter: (value, row) => formatCompactNumber(row.directorExpense)
        },
        {
            field: 'producerExpense',
            headerName: 'Producer Expense',
            width: 100,
            editable: true,
            valueGetter: (value, row) => formatCompactNumber(row.producerExpense)
        },
        { field: 'cardsUsed', headerName: 'Cards Used', width: 200, editable: true },
        { field: 'spaces', headerName: 'Space', width: 200, renderCell: (params) => params.row.spaces.join(', ') },
        { field: 'stakeholders', headerName: 'Stakeholders', width: 200, renderCell: (params) => params.row.stakeholders.join(', ') },
        { field: 'partners', headerName: 'Partners', width: 200, renderCell: (params) => params.row.partners.join(', ') },
    ];
}
