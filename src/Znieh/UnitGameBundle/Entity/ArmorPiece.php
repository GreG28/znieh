<?php

namespace Znieh\UnitGameBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

/**
 * ArmorPiece
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Znieh\UnitGameBundle\Entity\ArmorPieceRepository")
 * @ExclusionPolicy("all")
 */
class ArmorPiece
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
     * @var \DateTime
     *
     * @ORM\Column(name="createdAt", type="datetime", nullable=true)
     */
    private $createdAt;

    /**
     * @ORM\ManyToOne(targetEntity="Znieh\VillageGameBundle\Entity\ArmorPart", cascade={"persist"})
     * @Expose
     */
    private $part;

    /**
     * @ORM\ManyToOne(targetEntity="Znieh\VillageGameBundle\Entity\Rune", cascade={"persist"})
     * @Expose
     */
    private $rune;

    /**
     * @ORM\ManyToOne(targetEntity="Znieh\VillageGameBundle\Entity\Insigna", cascade={"persist"})
     * @Expose
     */
    private $insigna;

    public function __construc()
    {
        $this->createdAt = new \DateTime();
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
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return ArmorPiece
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set part
     *
     * @param \Znieh\VillageGameBundle\Entity\ArmorPart $part
     *
     * @return ArmorPiece
     */
    public function setPart(\Znieh\VillageGameBundle\Entity\ArmorPart $part = null)
    {
        $this->part = $part;

        return $this;
    }

    /**
     * Get part
     *
     * @return \Znieh\VillageGameBundle\Entity\ArmorPart
     */
    public function getPart()
    {
        return $this->part;
    }

    /**
     * Set rune
     *
     * @param \Znieh\VillageGameBundle\Entity\Rune $rune
     *
     * @return ArmorPiece
     */
    public function setRune(\Znieh\VillageGameBundle\Entity\Rune $rune = null)
    {
        $this->rune = $rune;

        return $this;
    }

    /**
     * Get rune
     *
     * @return \Znieh\VillageGameBundle\Entity\Rune
     */
    public function getRune()
    {
        return $this->rune;
    }

    /**
     * Set insigna
     *
     * @param \Znieh\VillageGameBundle\Entity\Insigna $insigna
     *
     * @return ArmorPiece
     */
    public function setInsigna(\Znieh\VillageGameBundle\Entity\Insigna $insigna = null)
    {
        $this->insigna = $insigna;

        return $this;
    }

    /**
     * Get insigna
     *
     * @return \Znieh\VillageGameBundle\Entity\Insigna
     */
    public function getInsigna()
    {
        return $this->insigna;
    }
}
