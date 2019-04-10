/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package khainq.modals.tbl_Config;

import java.io.Serializable;

/**
 *
 * @author khainguyenquang
 */
public class Tbl_ConfigDTO implements Serializable {
    private int id;
    private int dateRefund;
    private int priceRatiol;

    public Tbl_ConfigDTO() {
    }

    public Tbl_ConfigDTO(int id, int dateRefund, int priceRatiol) {
        this.id = id;
        this.dateRefund = dateRefund;
        this.priceRatiol = priceRatiol;
    }

    /**
     * @return the id
     */
    public int getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * @return the dateRefund
     */
    public int getDateRefund() {
        return dateRefund;
    }

    /**
     * @param dateRefund the dateRefund to set
     */
    public void setDateRefund(int dateRefund) {
        this.dateRefund = dateRefund;
    }

    /**
     * @return the priceRatiol
     */
    public int getPriceRatiol() {
        return priceRatiol;
    }

    /**
     * @param priceRatiol the priceRatiol to set
     */
    public void setPriceRatiol(int priceRatiol) {
        this.priceRatiol = priceRatiol;
    }
    
    
}
