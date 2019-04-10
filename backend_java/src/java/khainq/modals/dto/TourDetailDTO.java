/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package khainq.modals.dto;

import java.io.Serializable;
import java.util.List;
import khainq.modals.tbl_Image.Tbl_ImageDTO;
import khainq.modals.tbl_Tours.Tbl_ToursDTO;

/**
 *
 * @author khainguyenquang
 */
public class TourDetailDTO extends Tbl_ToursDTO implements Serializable {
    private List<Tbl_ImageDTO> listImage;

    public TourDetailDTO() {
    }

    public TourDetailDTO(Tbl_ToursDTO dto, List<Tbl_ImageDTO> listImage) {
        super(dto.getId(), dto.getName(), dto.getStartDate(), dto.getEndDate(), 
                dto.getMemberNumber(), dto.getDescription(), dto.getPrice(), 
                dto.getMaxMemberNumber(), dto.getCategoryId(), dto.getStatus());
        this.listImage = listImage;
    }

    /**
     * @return the listImage
     */
    public List<Tbl_ImageDTO> getListImage() {
        return listImage;
    }

    /**
     * @param listImage the listImage to set
     */
    public void setListImage(List<Tbl_ImageDTO> listImage) {
        this.listImage = listImage;
    }
    
    
}
