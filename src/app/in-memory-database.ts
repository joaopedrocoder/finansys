import { InMemoryDbService } from "angular-in-memory-web-api"
import { Category } from "./modules/categories/models/category.model"
import { Entry } from "./modules/entries/models/entry.model"

export class InMemoryDatabase implements InMemoryDbService {
    createDb(){
        const categories: Category[] = [
            { id: 1, name: 'Moradia', description: 'Pagamentos de contas de casa' },
            { id: 2, name: 'Saúde', description: 'Plano de saúde e remédios' },
            { id: 3, name: 'Lazer', description: 'Cinemas, parques, praias, etc' },
            { id: 4, name: 'Salário', description: 'Recebimento de salário' },
            { id: 5, name: 'Freelas', description: 'Trabalhos como frelancers' },
        ]

        const entries: Entry[] = [
            { id: 1, name: 'Gás de cozinha', categoryId: categories[0].id, category: categories[0], paid: true, date: '28/11/2023', amount: '92,00', type: 'expense' } as Entry,
            { id: 2, name: 'Salário da empresa', categoryId: categories[3].id, category: categories[3], paid: true, date: '03/12/2023', amount: '3.400,00', type: 'renevue' } as Entry,
            { id: 3, name: 'Aluguel da casa', categoryId: categories[0].id, category: categories[0], paid: true, date: '05/12/2023', amount: '550,00', type: 'expense' } as Entry,
            { id: 6, name: 'Conta de luz', categoryId: categories[0].id, category: categories[0], paid: true, date: '20/12/2023', amount: '92,00', type: 'expense' } as Entry,
            { id: 8, name: 'Conta de água', categoryId: categories[0].id, category: categories[0], paid: false, date: '08/12/2023', amount: '60,00', type: 'expense' } as Entry,
            { id: 11, name: 'Plano de saúde', categoryId: categories[1].id, category: categories[1], paid: true, date: '04/12/2023', amount: '600,00', type: 'expense' } as Entry,
            { id: 12, name: 'Pagamento pelo projeto do site Fulanos', categoryId: categories[4].id, category: categories[4], paid: false, date: '08/12/2023', amount: '400,00', type: 'renevue' } as Entry,
            { id: 18, name: 'Serviços de stream', categoryId: categories[2].id, category: categories[2], paid: true, date: '05/12/2023', amount: '150,00', type: 'expense' } as Entry,
            { id: 21, name: 'Pagamento pelo projeto MedClean', categoryId: categories[4].id, category: categories[4], paid: true, date: '02/12/2023', amount: '700,00', type: 'renevue' } as Entry,
            { id: 22, name: 'Remedios para alergia', categoryId: categories[1].id, category: categories[1], paid: true, date: '30/11/2023', amount: '118,80', type: 'expense' } as Entry,
            { id: 23, name: 'Tv a cabo', categoryId: categories[2].id, category: categories[2], paid: false, date: '06/12/2023', amount: '122,00', type: 'expense' } as Entry,
        ]

        return {categories, entries}
    }
    
}