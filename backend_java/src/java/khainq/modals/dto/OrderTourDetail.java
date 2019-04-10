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
public class OrderTourDetail extends Tbl_ToursDTO implements Serializable {
    private int quantity;

    public OrderTourDetail() {
    }

    public OrderTourDetail(int quantity, Tbl_ToursDTO dto) {
        super(dto.getId(), dto.getName(), dto.getStartDate(), dto.getEndDate(), 
                dto.getMemberNumber(), dto.getDescription(), dto.getPrice(),
                dto.getMaxMemberNumber(), dto.getCategoryId(), dto.getStatus());
        
        this.quantity = quantity;
    }

    /**
     * @return the quantity
     */
    public int getQuantity() {
        return quantity;
    }

    /**
     * @param quantity the quantity to set
     */
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    
    
}
