
import trash from './trash.png';
import sixDots from './sixDots.png';
import chevronLeft from './chevronLeft.png';
import chevronRight from './chevronRight.png';
import edit from './edit.png';
import whiteChevronLeft from './whiteChevronLeft.png';
import logout from './logout.png';
import add from './add.png';
import gallery from './gallery.png';
import upload from './upload.png';
import image from './image.png';

const panelIcon ={
  trash,
  sixDots,
  chevronLeft,
  chevronRight,
  edit,
  whiteChevronLeft,
  logout,
  add,
  gallery,
  upload,
  image,
};

export type panelIconType =
 | 'trash'
 | 'sixDots'
 | 'chevronLeft'
 | 'chevronRight'
 | 'edit'
 | 'whiteChevronLeft'
 | 'logout'
 | 'add'
 | 'gallery'
 | 'upload'
 | 'image';


export default panelIcon;