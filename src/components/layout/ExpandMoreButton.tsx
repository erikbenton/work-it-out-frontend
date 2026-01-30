import { styled } from '@mui/material/styles';
import IconButton, { type IconButtonProps } from "@mui/material/IconButton";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

type Props = {
  expanded: boolean,
  handleExpandClick: () => void,
  ariaLabel: string,
  className: string
}

export default function ExpandMoreButton({ expanded, handleExpandClick, ariaLabel, className }: Props) {
  return (
    <ExpandMore
      expand={expanded}
      onClick={handleExpandClick}
      aria-expanded={expanded}
      aria-label={ariaLabel}
      className={className}
    >
      <ExpandMoreIcon />
    </ExpandMore>
  )
}