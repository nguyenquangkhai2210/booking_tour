/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package khainq.modals.tbl_Tours;

import java.io.Serializable;

/**
 *
 * @author khainguyenquang
 */
public class Tbl_ToursDTO implements Serializable {

    private int id;
    private String name;
    private String startDate;
    private String endDate;
    private int memberNumber;
    private String description;
    private float price;
    private int maxMemberNumber;
    private int categoryId;
    private String status;
    
    public Tbl_ToursDTO() {
    }

    public Tbl_ToursDTO(int id, String name, String startDate, String endDate, int memberNumber, String description, float price, int maxMemberNumber, int categoryId, String status) {
        this.id = id;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.memberNumber = memberNumber;
        this.description = description;
        this.price = price;
        this.maxMemberNumber = maxMemberNumber;
        this.categoryId = categoryId;
        this.status = status;
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
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return the startDate
     */
    public String getStartDate() {
        return startDate;
    }

    /**
     * @param startDate the startDate to set
     */
    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    /**
     * @return the endDate
     */
    public String getEndDate() {
        return endDate;
    }

    /**
     * @param endDate the endDate to set
     */
    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    /**
     * @return the memberNumber
     */
    public int getMemberNumber() {
        return memberNumber;
    }

    /**
     * @param memberNumber the memberNumber to set
     */
    public void setMemberNumber(int memberNumber) {
        this.memberNumber = memberNumber;
    }

    /**
     * @return the description
     */
    public String getDescription() {
        return description;
    }

    /**
     * @param description the description to set
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * @return the price
     */
    public float getPrice() {
        return price;
    }

    /**
     * @param price the price to set
     */
    public void setPrice(float price) {
        this.price = price;
    }

    /**
     * @return the maxMemberNumber
     */
    public int getMaxMemberNumber() {
        return maxMemberNumber;
    }

    /**
     * @param maxMemberNumber the maxMemberNumber to set
     */
    public void setMaxMemberNumber(int maxMemberNumber) {
        this.maxMemberNumber = maxMemberNumber;
    }

    /**
     * @return the categoryId
     */
    public int getCategoryId() {
        return categoryId;
    }

    /**
     * @param categoryId the categoryId to set
     */
    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    /**
     * @return the status
     */
    public String getStatus() {
        return status;
    }

    /**
     * @param status the status to set
     */
    public void setStatus(String status) {
        this.status = status;
    }
    
    
}
