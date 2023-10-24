import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { ItemType } from '../types/index'; // Importe o tipo ItemType
import { useEffect } from 'react';
import MonsterInfo from '../MonsterInfo';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


interface FullScreenDialogProps {
    item: ItemType;
    data: ItemType[];
    selectedMobName: string | null;
    setSelectedMobName: (mobName: string | null) => void;
  }


  export default function FullScreenDialog({
    item,
    data,
    selectedMobName,
    setSelectedMobName,
  }: FullScreenDialogProps) {
    const [open, setOpen] = React.useState(false);
    const [selectedDropItem, setSelectedDropItem] = React.useState<string | null>();
    const [similarMobs, setSimilarMobs] = React.useState<ItemType[]>([]);
    const [similarMob, setSimilarMob] = React.useState<ItemType | null>(null);
    const [originalMob, setOriginalMob] = React.useState<ItemType | null>(null);






    const handleClickOpen = (mob: any) => {
        setOriginalMob(similarMob);
        setOpen(true); // Abra o diálogo
      };

      const handleClose = () => {
        setSimilarMob(originalMob);
        setOpen(false);
      };

    const handleSimilarMobClick = (mob: ItemType) => {
        setSimilarMob(mob); // Atualize o monstro similar selecionado
      };
      




    const mob = similarMob ? similarMob:item

    // Suponha que `item` seja do tipo ItemType.
    const itemListWithPercentages = Object.keys(mob).map((key, index) => {
        const dropValue = mob[key as keyof ItemType];
        if (dropValue && dropValue.includes('(')) {
            const primary = dropValue.split('(')[0];
            const percentageMatch = dropValue.match(/\(([^)]+)\)/);
            const percentage = percentageMatch ? parseFloat(percentageMatch[1]) : 0;
            return { primary, percentage, index };
        }
        return null;
    });



    // Remova os valores nulos do array.
    const filteredItemListWithPercentages = itemListWithPercentages.filter(item => item !== null);

    // Ordene o novo array com base nas porcentagens em ordem decrescente.
    filteredItemListWithPercentages.sort((a, b) => (b?.percentage ?? 0) - (a?.percentage ?? 0));


    function getClassForElement(element: any) {
        if (/Dark/i.test(element)) {
            return 'Dark';
        } else if (/Earth/i.test(element)) {
            return 'Earth';
        } else if (/Fire/i.test(element)) {
            return 'Fire';
        } else if (/Water/i.test(element)) {
            return 'Water';
        } else if (/Ghost/i.test(element)) {
            return 'Ghost';
        } else if (/Holy/i.test(element)) {
            return 'Holy';
        } else if (/Poison/i.test(element)) {
            return 'Poison';
        } else if (/Undead/i.test(element)) {
            return 'Undead';
        } else if (/Wind/i.test(element)) {
            return 'Wind';
        } else {
            return ''; // Classe padrão (sem cor) se nenhuma palavra-chave for encontrada
        }
    }

    const mobDetails = selectedMobName
        ? data.find((mob) => mob['Mob Name'] === selectedMobName)
        : null;


    function findSimilarMobs(data: ItemType[], clickedItem: string): ItemType[] {
        const similarMobs: ItemType[] = [];

        // Limpar o item clicado e tornar a pesquisa insensível a maiúsculas e minúsculas
        const cleanedClickedItem = clickedItem.trim().toLowerCase();

        data.forEach((mob) => {
            for (let i = 1; i <= 10; i++) {
                const dropFieldName = `Drop ${i}` as keyof ItemType;
                const mobDropValue = mob[dropFieldName];

                if (mobDropValue) {
                    // Limpar o valor do drop na planilha e tornar a pesquisa insensível a maiúsculas e minúsculas
                    const cleanedMobDropValue = mobDropValue.trim().toLowerCase();

                    // Verificar se o item clicado está contido no valor do drop
                    if (cleanedMobDropValue.includes(cleanedClickedItem)) {
                        similarMobs.push(mob);
                        break;
                    }
                }
            }
        });

        return similarMobs;
    }

    const handleItemClick = (clickedItem: string) => {
        setSelectedDropItem(clickedItem);

        // Extrair o nome do item do valor clicado, ignorando a porcentagem
        const clickedItemName = clickedItem.trim().split('(')[0].toLowerCase();
        console.log(clickedItemName)

        // Inicializar uma lista de mobs relacionados
        const relatedMobs: ItemType[] = [];

        // Percorrer cada mob
        data.forEach((mob) => {
            for (let i = 1; i <= 10; i++) {
                const dropFieldName = `Drop ${i}` as keyof ItemType;
                const mobDropValue = mob[dropFieldName];

                if (mobDropValue) {
                    // Extrair o nome do item do valor do drop, ignorando a porcentagem
                    const mobItemName = mobDropValue.split('(')[0].trim();

                    // Comparar os nomes dos itens
                    if (mobItemName.trim().toLowerCase() === clickedItemName) {
                        // Adicionar o mob à lista de mobs relacionados
                        relatedMobs.push(mob);
                    }
                }
            }
        });

        setSimilarMobs(relatedMobs);
        setSelectedMobName(clickedItem);
        console.log(clickedItem)
        console.log(relatedMobs)
    };

    useEffect(() => {
        if (similarMob) {
          // Atualize os dados do monstro similar com base em similarMob
          setSimilarMobs([similarMob]);
        }
      }, [similarMob]);


    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open
            </Button>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <MonsterInfo />
            </Dialog>
        </div>
    );
}
