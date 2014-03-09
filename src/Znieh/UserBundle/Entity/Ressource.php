<?php

namespace Znieh\UserBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Ressources
 *
 * @ORM\Table()
 * @ORM\Entity()
 */
class Ressource
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var integer
     *
     * @ORM\Column(name="gold", type="integer")
     */
    private $gold;

    /**
     * @var integer
     *
     * @ORM\Column(name="sto", type="integer")
     */
    private $sto;

    /**
     * @var integer
     *
     * @ORM\Column(name="copper", type="integer")
     */
    private $copper;

    /**
     * @var integer
     *
     * @ORM\Column(name="bronze", type="integer")
     */
    private $bronze;

    /**
     * @var integer
     *
     * @ORM\Column(name="minorCloth", type="integer")
     */
    private $minorCloth;

    /**
     * @var integer
     *
     * @ORM\Column(name="standardCloth", type="integer")
     */
    private $standardCloth;

    /**
     * @var integer
     *
     * @ORM\Column(name="roughLeather", type="integer")
     */
    private $roughLeather;

    /**
     * @var integer
     *
     * @ORM\Column(name="rawLeather", type="integer")
     */
    private $rawLeather;

    /**
     * @var integer
     *
     * @ORM\Column(name="cedarWood", type="integer")
     */
    private $cedarWood;

    /**
     * @var integer
     *
     * @ORM\Column(name="oakWood", type="integer")
     */
    private $oakWood;


    public function __construct()
    {
        $this->gold = 1337;
        $this->sto = 1337;
        $this->copper = 1337;
        $this->bronze = 1337;
        $this->minorCloth = 1337;
        $this->standardCloth = 1337;
        $this->roughLeather = 1337;
        $this->rawLeather= 1337;
        $this->oakWood = 1337;
        $this->cedarWood = 1337;
    }


    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set gold
     *
     * @param integer $gold
     * @return Ressource
     */
    public function setGold($gold)
    {
        $this->gold = $gold;

        return $this;
    }

    /**
     * Get gold
     *
     * @return integer
     */
    public function getGold()
    {
        return $this->gold;
    }

    public function hasEnoughGold($val)
    {
        if($this->gold >= $val)
            return true;
        return false;
    }

    public function addGold($mod)
    {
        if($this->gold + $mod < 0)
            $this->gold = 0;
        else
            $this->gold = $this->gold + $mod;
    }

    /**
     * Set sto
     *
     * @param integer $sto
     * @return Ressource
     */
    public function setSto($sto)
    {
        $this->sto = $sto;

        return $this;
    }

    /**
     * Get sto
     *
     * @return integer
     */
    public function getSto()
    {
        return $this->sto;
    }

    public function hasEnoughSto($val)
    {
        if($this->sto >= $val)
            return true;
        return false;
    }

    public function addSto($mod)
    {
        if($this->sto + $mod < 0)
            $this->sto = 0;
        else
            $this->sto = $this->sto + $mod;
    }

    /**
     * Set copper
     *
     * @param integer $copper
     * @return Ressource
     */
    public function setCopper($copper)
    {
        $this->copper = $copper;

        return $this;
    }

    /**
     * Get copper
     *
     * @return integer
     */
    public function getCopper()
    {
        return $this->copper;
    }

    public function hasEnoughCopper($val)
    {
        if($this->copper >= $val)
            return true;
        return false;
    }

    public function addCopper($mod)
    {
        if($this->copper + $mod < 0)
            $this->copper = 0;
        else
            $this->copper = $this->copper + $mod;
    }

    /**
     * Set bronze
     *
     * @param integer $bronze
     * @return Ressource
     */
    public function setBronze($bronze)
    {
        $this->bronze = $bronze;

        return $this;
    }

    /**
     * Get bronze
     *
     * @return integer
     */
    public function getBronze()
    {
        return $this->bronze;
    }

    public function hasEnoughBronze($val)
    {
        if($this->gold >= $val)
            return true;
        return false;
    }

    public function addBronze($mod)
    {
        if($this->bronze + $mod < 0)
            $this->bronze = 0;
        else
            $this->bronze = $this->bronze + $mod;
    }

    /**
     * Set minorCloth
     *
     * @param integer $minorCloth
     * @return Ressource
     */
    public function setMinorCloth($minorCloth)
    {
        $this->minorCloth = $minorCloth;

        return $this;
    }

    /**
     * Get minorCloth
     *
     * @return integer
     */
    public function getMinorCloth()
    {
        return $this->minorCloth;
    }

    public function hasEnoughMinorCloth($val)
    {
        if($this->minorCloth >= $val)
            return true;
        return false;
    }

    public function addMinorCloth($mod)
    {
        if($this->minorCloth + $mod < 0)
            $this->minorCloth = 0;
        else
            $this->minorCloth = $this->minorCloth + $mod;
    }

    /**
     * Set standardCloth
     *
     * @param integer $standardCloth
     * @return Ressource
     */
    public function setStandardCloth($standardCloth)
    {
        $this->standardCloth = $standardCloth;

        return $this;
    }

    /**
     * Get standardCloth
     *
     * @return integer
     */
    public function getStandardCloth()
    {
        return $this->standardCloth;
    }

    public function hasEnoughStandardCloth($val)
    {
        if($this->standardCloth >= $val)
            return true;
        return false;
    }

    public function addStandardCloth($mod)
    {
        if($this->standardCloth + $mod < 0)
            $this->standardCloth = 0;
        else
            $this->standardCloth = $this->standardCloth + $mod;
    }

    /**
     * Set roughLeather
     *
     * @param integer $roughLeather
     * @return Ressource
     */
    public function setRoughLeather($roughLeather)
    {
        $this->roughLeather = $roughLeather;

        return $this;
    }

    /**
     * Get roughLeather
     *
     * @return integer
     */
    public function getRoughLeather()
    {
        return $this->roughLeather;
    }

    public function hasEnoughRoughLeather($val)
    {
        if($this->roughLeather >= $val)
            return true;
        return false;
    }

    public function addRoughLeather($mod)
    {
        if($this->roughLeather + $mod < 0)
            $this->roughLeather = 0;
        else
            $this->roughLeather = $this->roughLeather + $mod;
    }

    /**
     * Set rawLeather
     *
     * @param integer $rawLeather
     * @return Ressource
     */
    public function setRawLeather($rawLeather)
    {
        $this->rawLeather = $rawLeather;

        return $this;
    }

    /**
     * Get rawLeather
     *
     * @return integer
     */
    public function getRawLeather()
    {
        return $this->rawLeather;
    }

    public function hasEnoughRawLeather($val)
    {
        if($this->rawLeather >= $val)
            return true;
        return false;
    }

    public function addRawLeather($mod)
    {
        if($this->rawLeather + $mod < 0)
            $this->rawLeather = 0;
        else
            $this->rawLeather = $this->rawLeather + $mod;
    }

    /**
     * Set cedarWood
     *
     * @param integer $cedarWood
     * @return Ressource
     */
    public function setCedarWood($cedarWood)
    {
        $this->cedarWood = $cedarWood;

        return $this;
    }

    /**
     * Get cedarWood
     *
     * @return integer
     */
    public function getCedarWood()
    {
        return $this->cedarWood;
    }

    public function hasEnoughCedarWood($val)
    {
        if($this->cedarWood >= $val)
            return true;
        return false;
    }

    public function addCedarWood($mod)
    {
        if($this->cedarWood + $mod < 0)
            $this->cedarWood = 0;
        else
            $this->cedarWood = $this->cedarWood + $mod;
    }

    /**
     * Set oakWood
     *
     * @param integer $oakWood
     * @return Ressource
     */
    public function setOakWood($oakWood)
    {
        $this->oakWood = $oakWood;

        return $this;
    }

    /**
     * Get oakWood
     *
     * @return integer
     */
    public function getOakWood()
    {
        return $this->oakWood;
    }

    public function hasEnoughOakWood($val)
    {
        if($this->oakWood >= $val)
            return true;
        return false;
    }

    public function addOakWood($mod)
    {
        if($this->oakWood + $mod < 0)
            $this->oakWood = 0;
        else
            $this->oakWood = $this->oakWood + $mod;
    }
}
