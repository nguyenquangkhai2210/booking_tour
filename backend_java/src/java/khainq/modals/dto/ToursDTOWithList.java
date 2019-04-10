/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package khainq.modals.dto;

import java.io.Serializable;
import khainq.modals.tbl_Tours.Tbl_ToursDTO;

/**
 *
 * @author khainguyenquang
 */
public class ToursDTOWithList extends Tbl_ToursDTO implements Serializable {
    private String image;
    
    public ToursDTOWithList() {
    }

    public ToursDTOWithList(String image, Tbl_ToursDTO dto) {
        super(dto.getId(), dto.getName(), dto.getStartDate(), dto.getEndDate(), 
                dto.getMemberNumber(), dto.getDescription(), dto.getPrice(), 
                dto.getMaxMemberNumber(), dto.getCategoryId(), dto.getStatus());
        this.image = image;
    }

    /**
     * @return the image
     */
    public String getImage() {
        return image;
    }

    /**
     * @param image the image to set
     */
    public void setImage(String image) {
        this.image = image;
    }
    
}
